function setup() {
  const joinBtn = document.getElementById("join-btn") as HTMLButtonElement;
  const hostBtn = document.getElementById("host-btn") as HTMLButtonElement;

  const nicknameInput = document.getElementById("nickname") as HTMLInputElement;

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

      if (res.redirected) {
          console.log(res.url);
          window.location.href = res.url; // redirect
      }
    });
  });

  hostBtn.addEventListener("click", async () => {
    const nickname = nicknameInput.value.trim();

    const res = await fetch(`/api/create-game?nickname=${encodeURIComponent(nickname)}`, {
        method: 'GET',
        credentials: 'include'
    });
    console.log(res);

    if(res.status == 400) return;

    if (res.redirected) {
        console.log(res.url);
        window.location.href = res.url; // redirect
    }
  });
}

document.addEventListener('DOMContentLoaded', setup);
