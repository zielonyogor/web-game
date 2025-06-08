import { NetworkManager } from "./net/NetworkManager";

NetworkManager.connect();

document.addEventListener('DOMContentLoaded', () => {
    const codeSpan = document.getElementById("code") as HTMLElement;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if(code === null) {
        console.error("Could not find code");
        return;
    }
    codeSpan.textContent = code;

    const copyButton = document.getElementById("copy-code") as HTMLButtonElement;
    copyButton.addEventListener("click", (_) => {
        console.log("copied");
        navigator.clipboard.writeText(code);
    })
})