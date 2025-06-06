function setupButtons() {
  const joinBtn = document.getElementById("join-btn");
  const hostBtn = document.getElementById("host-btn");

  if (!(joinBtn instanceof HTMLButtonElement) || !(hostBtn instanceof HTMLButtonElement)) {
    console.error("Buttons not found or not valid button elements.");
    return;
  }

  joinBtn.addEventListener("click", () => {
    console.log("Join button clicked");
    // Handle join logic
  });

  hostBtn.addEventListener("click", async () => {
    const nickname = (document.getElementById("nickname") as HTMLInputElement).value.trim();
    console.log(nickname);

    const res = await fetch(`/api/create-game?nickname=${encodeURIComponent(nickname)}`, {
        method: 'GET',
        credentials: 'include'
    });
    console.log(res);

    if (res.redirected) {
        console.log(res.url);
        window.location.href = res.url; // redirect
    }
  });
}

document.addEventListener('DOMContentLoaded', setupButtons);
