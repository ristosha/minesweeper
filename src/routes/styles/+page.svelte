<script lang="ts">
  import StylePalette from '$lib/components/StylePalette.svelte'
  import { styles } from '$lib/styles'
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft'
  import { goto } from '$app/navigation'
  import IconButton from '$lib/components/IconButton.svelte'
</script>

<main>
    <div class="back">
        <IconButton on:click={() => goto('./')}>
            <ArrowLeft size="25px"/>
            <p>Back to main</p>
        </IconButton>
    </div>
    <div class="styles">
        {#each styles as style}
            <StylePalette style={style}/>
        {/each}
    </div>

</main>

<style>
    .back {
        width: 100%
    }

    .styles {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>
