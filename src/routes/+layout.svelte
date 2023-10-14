<script lang="ts">
  import { style } from '$lib/store'
  import { camelToKebab } from '$lib/styles'
  import { onMount } from 'svelte'

  onMount(() => {
    updateColors()
    style.subscribe(() => updateColors())
  })

  function updateColors() {
    Object.entries($style).forEach(([prop, value]) => {
      if (!prop.startsWith('_')) {
        document.documentElement.style.setProperty(`--${camelToKebab(prop)}`, value)
      }
    })
  }
</script>

<div class="wrapper">
    <header><p>Minesweeper Game</p></header>
    <slot />
    <footer><p>Made by Ristosha</p></footer>
</div>

<style>
    :global(*) {
        margin: 0;
        border: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: rgb(var(--text-color));
    }

    :global(:root) {
        --primary-color: 27, 153, 139;
        --secondary-color: 27, 153, 139;
        --tertiary-color: 0, 0, 0;
        --quaternary-color: 101, 97, 118;

        --background: rgba(248, 241, 255, 1);
        --text-color: var(--tertiary-color);
        --bomb-cell-color: rgba(153, 27, 72, 0.5);
        --flag-color: rgba(30, 30, 30, 1);
        --hidden-cell-color: rgba(var(--primary-color), 0.8);

        --pop-up-background: var(--flag-color);
        --pop-up-text-color: var(--background);
        --pop-up-close-hover-color: rgb(194, 187, 201);
    }

    :global(body) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: var(--background);
    }

    :global(input::-webkit-outer-spin-button),
    :global(input::-webkit-inner-spin-button),
    :global(input[type=number]) {
        -webkit-appearance: none;
        outline: 0;
        margin: 0;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-height: 100dvh;

        & main {
            display: flex;
            flex-direction: column;
            gap: 15px;

            @media screen and (min-width: 350px) {
                min-width: 300px;
            }
        }
    }

    header, footer {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;

        & p {
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            user-select: none;
            color: rgba(var(--quaternary-color), 0.3)
        }
    }
</style>
