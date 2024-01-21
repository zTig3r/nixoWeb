<script lang="ts">
  import { onMount } from 'svelte';

  let rules: any[] = [];

  onMount(async () => {
    const response = await fetch('/rules.json');
    rules = await response.json();
  });
</script>

<section class = "container mx-auto max-w-5xl py-0.5 my-5 bg-black/20 rounded-2xl">
  {#each rules as rule, index}
      <p class="py-2 m-8 text-lg">
        <span>{index +1}. {rule.content}</span>
      </p>
  {/each}
</section>