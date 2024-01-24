<script lang="ts">
  import { onMount } from 'svelte';
  import { title } from "$lib/titleStore";

  interface Entry {
    title: string;
    content: string;
    isOpen: boolean;
  }

  let entries: any[] = [];

  function parseContent(content: string): string {
    const imagePlaceholderRegex = /\[img:(.*?)\]/g;
    const linkPlaceholderRegex = /\[link:(.*?)\|(.*?)\]/g;
    const starFormattingRegex = /(\*{1,3})(.*?)(\*{1,3})/g;
    const lineBreakRegex = /\n/g;


    content = content.replace(imagePlaceholderRegex, (_match, imagePath) => {
      return `<img class="py-5" src="${imagePath}" alt="Image">`;
    });

    content = content.replace(linkPlaceholderRegex, (_match, linkUrl, linkText) => {
      return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="linkText">${linkText}</a>`;
    });

    content = content.replace(starFormattingRegex, (match, star1, text, star2) => {
      if (star1 === '***' && star2 === '***') {
        return `<span class="font-bold">${text}</span>`;
      } else if (star1 === '**' && star2 === '**') {
        return `<span class="font-semibold">${text}</span>`; 
      } else {
        return `<span class="italic">${text}</span>`;
      }
    });
    
    content = content.replace(lineBreakRegex, '<br>');

    return content;
  }


  function toggleAccordion(index: number) {
    entries = entries.map((entry, i) => {
      if (i === index) {
        return { ...entry, isOpen: !entry.isOpen };
      } else {
        return { ...entry, isOpen: false };
      }
    });
  }

  onMount(async () => {
    title.set("FAQ");

    const response = await fetch('/faq.json');
    const json = await response.json();
    entries = json.slice(1).map((item: any) => ({
      title: item.title,
      content: parseContent(item.content),
      isOpen: false,
    }));
  });
</script>

<section class = "container mx-auto max-w-5xl py-0.5 my-5 overflow-hidden">
  {#each entries as entry, i}
    <div class="bg-black/20 mb-5 rounded-2xl">
      <button class="p-5 flex items-center w-full justify-between font-semibold" on:click={() => toggleAccordion(i)} on:keydown={(event) => {if (event.key === 'Enter') toggleAccordion(i)}}>
        <span class="font-bold text-lg">{entry.title}</span>
        <svg data-accordion-icon class={`w-3 h-3 ${entry.isOpen ? "" : "rotate-180"} shrink-0 hvr-transition`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
        </svg>
      </button>
        <div class={`bg-black/30 ${entry.isOpen ? "block p-5" : "invisible h-auto max-h-0 opacity-0"} transition-all hvr-transition`}>
          {@html entry.content}
        </div>
    </div>
  {/each}
</section>