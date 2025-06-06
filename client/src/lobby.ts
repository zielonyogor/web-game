document.addEventListener('DOMContentLoaded', () => {
    const codeSpan = document.getElementById("code") as HTMLElement;

    const urlParams = new URLSearchParams(window.location.search);
    codeSpan.textContent = urlParams.get("code");

    const copyButton = document.getElementById("copy-code") as HTMLButtonElement;
    copyButton.addEventListener("click", (_) => {
        console.log("copied");
    })
})