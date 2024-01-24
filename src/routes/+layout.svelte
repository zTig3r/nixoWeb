<script lang="ts">
  import "../app.css";
  import { goto } from "$app/navigation";
  import { title } from "$lib/titleStore";
  import logo from "$lib/assets/logo.png";

  async function navigateTo(path: string) {
    document.body.classList.remove("overflow-hidden");
    await goto(path);
  }

  async function main_page() {
    await navigateTo("/");
  }

  async function worlds_page() {
    await navigateTo("/worlds");
  }

  async function rules_page() {
    await navigateTo("/rules");
  }

  async function faq_page() {
    await navigateTo("/faq");
  }
</script>

<svelte:head>
  <title>{$title}</title>
</svelte:head>

<div class="sticky top-0 bg-gradient-to-r from-primary to-secondary p-0.5 px-0 pt-0 z-50">
  <nav class="flex w-screen items-center max-h-14 p-4 bg-navbar">
    <div class="flex-1 flex justify-start">
      <button on:click={main_page}>
        <img src={logo} alt="Logo" class="h-8 w-auto" />
      </button>
    </div>

    <div class="flex pl-10 space-x-20">
      <a class="btn-nav" href="/faq" on:click={faq_page}>
        <span>FaQ</span>
      </a>

      <a class="btn-nav" href="/rules" on:click={rules_page}>
        <span>Regeln</span>
      </a>

      <a class="btn-nav" href="/worlds" on:click={worlds_page}>
        <span>Welten</span>
      </a>
    </div>

    <div class="flex-1 flex justify-end">
      <a target="_blank" rel="noopener noreferrer" href="https://twitch.tv/fienix_and_izio">
        <svg width="24px" height="24px" viewBox="0 0 256 268" xmlns="http://www.w3.org/2000/svg" class="fill-white hover:fill-[#a970ff] hvr-transition">
          <path d="M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z"
          ></path>
        </svg>
      </a>
    </div>
  </nav>
</div>

<slot />
