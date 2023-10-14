<script lang="ts">
  import { fly} from 'svelte/transition'
  import Flag from 'phosphor-svelte/lib/Flag'
  import { createEventDispatcher } from 'svelte'

  export let index = 0
  export let marked = false
  export let hidden = false
  export let content = 0

  const dispatch = createEventDispatcher()
  let timer: number | null = null
  let duration = 250

  function touchStart() {
    if (timer == null) timer = setTimeout(() => dispatch('longtouch'), duration)
  }

  function touchEnd() {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
  }
</script>

<div
        class="cell"
        role="gridcell"
        tabindex={index}
        class:marked
        class:hidden
        class:empty={!hidden && content === 0}
        class:bomb={!hidden && content === -1}
        on:mousedown
        on:touchstart={() => touchStart()}
        on:touchmove={() => touchEnd()}
        on:touchend={() => touchEnd()}
        on:contextmenu|preventDefault
>
    {#if marked}
        <Flag size="20px" weight="fill"></Flag>
    {:else if hidden || content === 0}
        {' '}
    {:else if content === -1}
        💣
    {:else}
        <p>{content}</p>
    {/if}
</div>

<style>
    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        user-select: none;
        transition: all ease-in-out 100ms;
        cursor: default;

        &.empty {
            background: var(--background);
        }

        &.hidden {
            background: rgba(var(--primary-color), 0.8);
            border: none;

            &:hover {
                background: rgba(var(--primary-color), 1);
                cursor: pointer;
            }
        }

        &.marked {
            background: rgba(var(--quaternary-color), 0.8);
            border: none;

            & svg {
                fill: var(--flag-color);
            }

            &:hover {
                background: rgba(var(--quaternary-color), 1);
                cursor: pointer;
            }
        }

        &.bomb {
            background: var(--bomb-cell-color);
            border: none;
        }
    }
</style>
