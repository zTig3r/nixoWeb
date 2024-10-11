<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fetcher } from "$lib/fetcher";
    import { title } from "$lib/titleStore";

    async function auth() {
        const res = await fetcher("api/auth", "GET");
        const uri = res.uri;

        sessionStorage.setItem("state", new URLSearchParams(uri).get("state") ?? "");

        await goto(uri);
    }

    async function closeToast() {
        document.getElementById("toast-success")?.classList.add("hidden");
        document.getElementById("toast-failure")?.classList.add("hidden");
    }

    onMount(async () => {
        title.set("Streamelements");

        if(document.location.href.includes("error")) goto("/streamelements");
        if(!document.location.hash.startsWith("#")) return;
        if(sessionStorage.getItem("state") != new URLSearchParams(location.href).get("state")) {
            document.location.href ="/streamelements";
            return;
        } 

        const token = new URLSearchParams(document.location.hash.substring(1)).get("access_token") || "";
        const res = await fetcher("api/user-privilege?token=" + token, "GET");
        
        goto("/streamelements");
        if(res.authorized) {
            document.getElementById("toast-success")?.classList.remove("hidden");
            document.getElementById("tokenDiv")?.classList.remove("hidden");
            document.getElementById("tokenValue")!.innerHTML = token;
        } else document.getElementById("toast-failure")?.classList.remove("hidden");   
    })
</script>


<section class="min-h-screen">
    <div class="m-8 flex justify-center items-center">
        <a class="flex flex-col justify-center items-center rounded-lg bg-box hover:bg-black/50" href="/streamelements" on:click={auth}>
            <div class="flex items-center m-5">
                <svg width="24px" height="24px" viewBox="0 0 256 268" xmlns="http://www.w3.org/2000/svg" class="fill-twitch">
                    <path d="M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z"
                    ></path>
                </svg>
                <span class="ml-3 mb-">Mit Twitch anmelden</span>
            </div>
        </a>

        <div id="toast-success" class="toast-box hidden">
            <div class="toast-icon text-green">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
            </div>
            <div class="ms-3">Login erfolgreich.</div>
            <button type="button" on:click={closeToast} class="toast-button">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>

        <div id="toast-failure" class="toast-box hidden">
            <div class="toast-icon text-red">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
            </div>
            <div class="ms-3">Login fehlgeschlagen.</div>
            <button type="button" on:click={closeToast} class="toast-button">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    </div>

    <div id="tokenDiv" class="flex justify-center items-center space-x-2 hidden">
        <span>Token:</span>
        <span id="tokenValue"></span>
    </div>
</section>

