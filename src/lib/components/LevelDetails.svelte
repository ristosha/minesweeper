<script lang="ts">
  import { levels } from '$lib/game/data'
  import { menu } from '$lib/store'

  export let selected = 0
  let bombSize = 10, gridWidthSize = 10, gridHeightSize = 10

  $: {
    if (selected < 3) {
      const { width, height, bombs } = levels[selected]
      $menu.width = width
      $menu.height = height
      $menu.bombs = bombs
    }

    $menu.bombs = Math.min(Math.max($menu.bombs, 1), 100)
    $menu.width = Math.min(Math.max($menu.width, 1), 50)
    $menu.height = Math.min(Math.max($menu.height, 1), 50)

    bombSize = ($menu.bombs == null ? 1 : $menu.bombs).toString().length
    gridWidthSize = ($menu.width == null ? 1 : $menu.width).toString().length
    gridHeightSize = ($menu.height == null ? 1 : $menu.height).toString().length
  }
</script>


<div class="details">
    <div class="row">
        <p>Bomb count</p>
        {#if selected === 3}
            <input type="number" name="bombs" id="bombs" bind:value={$menu.bombs} style="width: {bombSize}ch">
        {:else}
            <p>{$menu.bombs}</p>
        {/if}
    </div>
    <div class="row">
        <p>Grid</p>
        {#if selected === 3}
            <div class="multi-input">
                <input type="number" name="width" id="width" min="1" max="50" bind:value={$menu.width} style="width: {gridWidthSize}ch">
                <p> × </p>
                <input type="number" name="height" id="height" min="1" max="50" bind:value={$menu.height} style="width: {gridHeightSize}ch">
            </div>
        {:else}
            <p>{$menu.width ?? '?'}×{$menu.height ?? '?'}</p>
        {/if}
    </div>
</div>

<style>
    .details {
        display: flex;
        align-self: stretch;
        align-items: center;
        flex-direction: column;
        gap: 10px;

        & p {
            font-weight: 400;
            font-variant-ligatures: none;
        }

        & .row {
            display: inline-flex;
            align-self: stretch;
            justify-content: space-between;
        }

        & input {
            max-width: fit-content;
            font-family: inherit;
            font-size: inherit;
            background: transparent;
            text-align: right;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 3px;
            font-weight: 400;
        }
    }

    .multi-input {
        display: inline-flex;
        align-items: center;
    }
</style>
