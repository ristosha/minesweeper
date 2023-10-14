<script lang="ts">
  import Modal from '$lib/components/Modal.svelte'
  import { randomSeed } from '$lib/game/utils'
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import GearSix from 'phosphor-svelte/lib/GearSix'
  import IconButton from '$lib/components/IconButton.svelte'
  import MenuButton from '$lib/components/MenuButton.svelte'
  import LevelDetails from '$lib/components/LevelDetails.svelte'
  import LevelSelector from '$lib/components/LevelSelector.svelte'
  import { game, menu, resetGame } from '$lib/store'
  import { onMount } from 'svelte'

  let level = 0
  let canContinue = false
  let showModal = false

  onMount(() => {
    if ($game.time.startedAt != null && $game.time.endedAt == null) {
      canContinue = true
    }

    game.subscribe((g) => {
      canContinue = g.time.startedAt != null && g.time.endedAt == null
    })
  })

  function startGame () {
    if (canContinue) {
      showModal = true
      return
    }

    restartGame()
  }

  function continueGame () {
    goto('/game')
  }

  function restartGame () {
    showModal = false
    canContinue = false
    resetGame()

    $game.grid = {
      width: $menu.width,
      height: $menu.height,
      bombs: Math.min($menu.height * $menu.width - 9, $menu.bombs)
    }

    $game.seed = randomSeed()

    continueGame()
  }
</script>

<main in:fly={{y: -10, opacity: 0.3, duration: 150}} out:fly={{y: 10, opacity: 0.3, duration: 150}}>
    {#if showModal}
        <Modal on:close={() => showModal = false}>
            <p>
                You have an unfinished game.
                <br><br>
                If you start a new one, all progress will be reset.
                <br><br>
                Are you sure?
            </p>

            <MenuButton primary={true} on:click={() => restartGame()}>Start new game</MenuButton>
        </Modal>
    {/if}

    <LevelSelector bind:selected={level}/>
    <LevelDetails bind:selected={level}/>
    <MenuButton primary on:click={() => startGame()}>Start new game</MenuButton>
    {#if canContinue}
        <MenuButton on:click={() => continueGame()}>Continue previous game</MenuButton>
    {/if}
    <div class="styling">
        <IconButton on:click={() => goto('/styles')}>
            <GearSix size="25px"/>
            <p>Configure a theme</p>
        </IconButton>
    </div>
</main>

<style>
    .styling {
        width: 100%;
    }
</style>
