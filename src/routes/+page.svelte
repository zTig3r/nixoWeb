<script lang="ts">
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import {title} from "$lib/titleStore";

    import logo from "$lib/assets/logo.webp";

    // TODO: NixoCraft 4 Bilder hinzufügen
    import image1 from "$lib/assets/slideShow/image1.jpg";
    import image2 from "$lib/assets/slideShow/image2.jpg";
    import image3 from "$lib/assets/slideShow/image3.jpg";
    import image4 from "$lib/assets/slideShow/image4.jpg";
    import image5 from "$lib/assets/slideShow/image5.jpg";
    import image6 from "$lib/assets/slideShow/image6.jpg";

    let images = [image1, image2, image3, image4, image5, image6];
    let currentImageIndex = writable(0);

    onMount(() => {
        title.clear();

        const interval = setInterval(() => {
            const nonHiddenImages = images.filter((_, index) => index !== $currentImageIndex);
            const randomIndex = Math.floor(Math.random() * nonHiddenImages.length);

            currentImageIndex.set(images.indexOf(nonHiddenImages[randomIndex]));
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<section>
    {#each images as image, index (index)}
        <img
                src={image}
                alt={`Image ${index + 1}`}
                class={`absolute w-full h-full object-cover transition-all animate-fade ${index === $currentImageIndex ? "" : "hidden"}`}
                aria-hidden="true"
        />
    {/each}

    <div class="relative bg-black/60 w-full min-h-screen">
        <div class="flex flex-col max-w-2xl justify-center mx-auto h-screen shadow" style="height: calc(100vh - 50px);">
            <img src={logo} alt="Logo" class="w-auto scale-90"/>

            <!-- TODO: Bei NixoCraft 4 Ende aktivieren

            <img src={nixoCraftLogo} alt="Logo" class="w-auto scale-90"/>

            <div class="text-center mt-10 text-shadow">
                <Countdown></Countdown>
            </div>

            -->
        </div>
    </div>
</section>