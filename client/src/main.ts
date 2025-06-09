import getCookie from "@shared/cookie";
import { initLobby } from "./lobby";

await document.fonts.ready;

function setup() {
  const joinBtn = document.getElementById("join-btn") as HTMLButtonElement;
  const hostBtn = document.getElementById("host-btn") as HTMLButtonElement;

  const nicknameInput = document.getElementById("nickname") as HTMLInputElement;

  let nickname = getCookie("nickname");
  if(nickname) {
    nicknameInput.value = nickname;
  }

  joinBtn.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();
    if (!nickname) {
      alert("Please enter a nickname.");
      return;
    }
    
    const codeModal = document.getElementById("code-modal") as HTMLElement;
    codeModal.classList.remove("hidden");
    
    const codeInput = document.getElementById("code") as HTMLInputElement;
    const joinGameBtn = document.getElementById("join-game-btn") as HTMLButtonElement;
    
    joinGameBtn.addEventListener("click", async () => {
      const nickname = nicknameInput.value.trim();
      const code = codeInput.value.trim();

      const res = await fetch(`/api/join-game?code=${encodeURIComponent(code)}&nickname=${encodeURIComponent(nickname)}`, {
          method: 'GET',
          credentials: 'include'
      });
      console.log(res);

      if(res.status == 400) {
        const message = await res.json();
        alert(message.error); // change to something prettier
        return;
      }
      if (res.status == 200) {
        initLobby();
      }
    });
  });

  hostBtn.addEventListener("click", async () => {
    nickname = nicknameInput.value.trim();
    console.log(`nickname: ${nickname}`);

    if (!nickname) {
      alert("Please enter a nickname.");
      return;
    }

    const res = await fetch(`/api/create-game?nickname=${encodeURIComponent(nickname)}`, {
        method: 'GET',
        credentials: 'include'
    });
    console.log(res);

    if(res.status == 400) {
      const message = await res.json();
      alert(message.error); // change to something prettier
      return;
    }
    if (res.status == 200) {
        initLobby();
    }
  });
}

if (document.readyState !== 'loading') {
    setup();
} else {
    document.addEventListener('DOMContentLoaded', setup);
}