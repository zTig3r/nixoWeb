<script lang="ts">
  import { onMount } from 'svelte';

  let sections: any[] = [];

  onMount(async () => {
    const response = await fetch('/rules.json');
    const jsonData = await response.json();

    sections = jsonData.sections || [];
  });
</script>

<section class="container mx-auto max-w-5xl py-0.5 my-5 bg-black/20 rounded-2xl">
  {#each sections as section}
    <div class="text-xl font-bold p-4">{section.title}</div>
    {#each section.rules as rule, ruleIndex}
      <p class="mx-8 my-8 text-lg">
        <span>{ruleIndex + 1}. {rule.content}</span>
      </p>
    {/each}
  {/each}
</section>