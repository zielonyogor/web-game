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
    const codeModal = document.getElementById("code-modal") as HTMLElement;
    codeModal.classList.remove("hidden");

    const codeInput = document.getElementById("code") as HTMLInputElement;
    const joinBtn = document.getElementById("join-game-btn") as HTMLButtonElement;

    joinBtn.addEventListener("click", async () => {
      const code = codeInput.value.trim();
      const nickname = nicknameInput.value.trim();

      const res = await fetch(`/api/join-game?code=${encodeURIComponent(code)}&nickname=${encodeURIComponent(nickname)}`, {
          method: 'GET',
          credentials: 'include'
      });
      console.log(res);

      if(res.status == 400) return;
      if (res.status == 200) {
        initLobby();
      }
    });
  });

  hostBtn.addEventListener("click", async () => {
    nickname = nicknameInput.value.trim();
    console.log(`nickname: ${nickname}`);

    const res = await fetch(`/api/create-game?nickname=${encodeURIComponent(nickname)}`, {
        method: 'GET',
        credentials: 'include'
    });
    console.log(res);

    if(res.status == 400) return;
    if (res.status == 200) {
        console.log('lobby');
        initLobby();
    }
  });
}

if (document.readyState !== 'loading') {
    setup();
} else {
    document.addEventListener('DOMContentLoaded', setup);
}