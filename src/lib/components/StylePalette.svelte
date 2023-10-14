<script lang="ts">
  import Circle from 'phosphor-svelte/lib/Circle'
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle'
  import { style as userStyle } from '$lib/store'
  import type { Style } from '$lib/styles'

  export let style: Style

  $: colors = [
    style.background,
    style.primaryColor,
    style.tertiaryColor,
    style.quaternaryColor
  ]

  function chooseStyle() {
    userStyle.set(style)
  }
</script>

<div class="style" class:active={$userStyle._name === style._name} on:click={() => chooseStyle()}>
    <div class="name">
        {#if $userStyle._name === style._name}
            <CheckCircle size="20px" color="rgb(var(--primary-color))"/>
            {:else}
            <Circle size="20px" color="rgb(var(--tertiary-color))"/>
        {/if}
        <p>{style._name}</p>
    </div>
    <div class="palette">
        {#each colors as color}
            <div class="color" style="background: {color.startsWith('rgb') ? color : `rgb(${color})`}"/>
        {/each}
    </div>
</div>

<style>
    .style {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 100px;
        padding: 20px;
        gap: 15px;
        border: 1px solid lightslategray;
        border-radius: 12px;

        &:not(.active) {
            cursor: pointer;
        }

        & p {
            font-weight: 400;
        }

        & .name {
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;

            & .status {
                width: 15px;
                height: 15px;
                border-radius: 12px;
                border: 1px solid rgb(var(--tertiary-color));
            }
        }

        &.active {
            & .status {
                background: rgb(var(--primary-color));
            }
        }
    }

    .palette {
        flex: 1 0 0;
        display: inline-flex;
        align-self: stretch;
        align-items: center;
        justify-content: center;
    }

    .color {
        background: white;
        flex: 1 0 0;
        align-self: stretch;
        border: 1px solid lightslategray;

        &:first-child {
            border-radius: 12px 0 0 12px;
        }

        &:last-child {
            border-radius: 0 12px 12px 0;
        }
    }
</style>
