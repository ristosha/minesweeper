<script lang="ts">
  import { levels } from '$lib/game/data'

  function chooseByKeyboard (e: KeyboardEvent) {
    if (e.altKey || e.shiftKey || e.ctrlKey) return

    if (
      ['ArrowLeft', 'ArrowUp'].includes(e.key) ||
      ['KeyW', 'KeyA'].includes(e.code)
    ) {
      selected -= 1
    } else if (
      ['ArrowRight', 'ArrowDown'].includes(e.key) ||
      ['KeyS', 'KeyD'].includes(e.code)
    ) {
      selected += 1
    }

    if (selected > levels.length - 1) {
      selected = 0
    } else if (selected < 0) {
      selected = levels.length - 1
    }
  }

  export let selected = 0

</script>

<div class="selector">
    {#each levels.entries() as [idx, level]}
        <div
                role="tab"
                tabindex={idx}
                class="level"
                class:active={selected === idx}
                on:click={() => selected = idx}
                on:keydown={(e) => chooseByKeyboard(e)}
                style="background: {selected === idx ? level.color : 'transparent'}"
                aria-label={level.name}
        >
            <p>{level.name}</p>
        </div>
    {/each}
</div>

<style>
    .selector, .level {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .level {
        flex: 1 0 0;
        padding: 10px;
        outline: none !important;
        background: var(--background);
        transition: all linear 0.25s;
        border-bottom: 1px solid rgba(var(--quaternary-color), 0.5);

        &:first-child {
            border-radius: 12px 0 0 5px;
        }

        &:not(:first-child) {
            border-left: 1px solid rgba(var(--quaternary-color), 0.5);
        }

        &:last-child {
            border-radius: 0 12px 5px 0;
        }

        &:hover {
            background: rgb(var(--quaternary-color));

            &:not(.active) {
                cursor: pointer;
            }
        }

        &.active {
            background: rgb(var(--secondary-color));
            user-select: none;
        }
    }
</style>
