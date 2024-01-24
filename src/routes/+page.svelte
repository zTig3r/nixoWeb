<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { useLazyImage as lazyImage } from 'svelte-lazy-image';
  
  import logo from "$lib/assets/logo.png";
  import image1 from "$lib/assets/slideShow/image1.png";
  import image2 from "$lib/assets/slideShow/image2.png";
  import image3 from "$lib/assets/slideShow/image3.png";
  import image4 from "$lib/assets/slideShow/image4.png";
  import image5 from "$lib/assets/slideShow/image5.png";
  import image6 from "$lib/assets/slideShow/image6.png";
  
  let images = [image1, image2, image3, image4, image5, image6];
  let currentImageIndex = writable(0);

  onMount(async () => {
    document.body.classList.add("overflow-hidden");

    const interval = setInterval(() => {
      const nonHiddenImages = images.filter((_, index) => index !== $currentImageIndex);
      const randomIndex = Math.floor(Math.random() * nonHiddenImages.length);

      currentImageIndex.set(images.indexOf(nonHiddenImages[randomIndex]));
    }, 10000);

    onDestroy(() => {
      clearInterval(interval);
    });
  });
</script>

<section>
  {#each images as image, index (index)}
    <img
      data-src={image}
      alt={`Image ${index + 1}`}
      class={`absolute w-full h-full object-cover transition-all animate-fade ${index === $currentImageIndex ? "" : "hidden"}`}
      aria-hidden="true"
      use:lazyImage
    />
  {/each}

  <div class="absolute bg-black/60 w-full">
    <div class="flex flex-col max-w-2xl justify-center mx-auto h-screen shadow" style="height: calc(100vh - 50px);">
      <img src={logo} alt="Logo" class="w-auto"/>
      <div class="text-center mt-10 text-2xl text-shadow font-semibold">
        <span>Joine und spiele mit <span data-playercounter-ip="mc.hypixel.net">0</span> anderen Spielern!</span>
      </div>
    </div>
  </div>
</section>