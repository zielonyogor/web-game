import getCookie from "@shared/cookie";
import { NetworkManager } from "./net/NetworkManager";

export function initLobby() {
    console.log("skisisi");
    NetworkManager.connect();

    document.getElementById("main-container")?.classList.add("hidden");
    document.getElementById("code-container")?.classList.remove("hidden");

    const codeSpan = document.getElementById("code-span") as HTMLElement;

    const code = getCookie("code");
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
}