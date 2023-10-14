<script lang="ts">
  import { goto } from '$app/navigation'
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft'
  import Cell from '$lib/components/game/Cell.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import MenuButton from '$lib/components/MenuButton.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import type { Point } from '$lib/game/types'
  import { createMap, fillBombs, fillCoefficients, getVisibleCells, includePoint, isGameOver } from '$lib/game/utils'
  import { type RandomGenerator, xoroshiro128plus } from 'pure-rand'
  import { game } from '$lib/store'
  import { onDestroy, onMount } from 'svelte'
  import { writable } from 'svelte/store'

  let map: number[][] = []
  let visibleCells = writable<Point[]>([])
  let rng: RandomGenerator
  let interval: number | null = null
  let showWinModal = false
  let showLossModal = false

  onMount(() => {
    rng = xoroshiro128plus($game.seed)
    map = createMap($game.grid.width, $game.grid.height)

    if ($game.time.startedAt != null) {
      fillMap()
      startHandlingTime()
      updateVisibility()
    }
  })

  onDestroy(() => stopHandlingTime())

  function startHandlingTime () {
    interval = setInterval(() => {
      $game.time.elapsedTime += 1
    }, 1000)
  }

  function stopHandlingTime () {
    if (interval != null) {
      clearInterval(interval)
      interval = null
    }
  }

  function fillMap () {
    map = fillCoefficients(fillBombs({
      map,
      rng,
      bombCount: $game.grid.bombs,
      startPoint: $game.cells.opened[0]
    }))
  }

  function updateVisibility () {
    visibleCells.set(getVisibleCells(map, $game.cells.opened))
    map = map
  }

  function mouseDown (isRightClick: boolean, x: number, y: number) {
    if ($game.time.endedAt != null) return

    if ($game.time.startedAt == null) {
      $game.time.startedAt = new Date()
      openCell(x, y)
      fillMap()
      startHandlingTime()
      updateVisibility()
      return
    }

    if (isRightClick) {
      if (isCellMarked(x, y)) {
        $game.cells.marked = $game.cells.marked.filter(p => !(p[0] === x && p[1] === y))
        map = map
      } else {
        if (isCellHidden(x, y)) {
          markCell(x, y)
        }

        if (isGameOver($game.grid.bombs, map, $game.cells.opened, $game.cells.marked)) {
          endGame()
        }

        updateVisibility()
      }
      return
    }

    if (!isCellMarked(x, y)) {
      if (map[x][y] === -1) {
        openCell(x, y)
        loseGame()
        updateVisibility()
        return
      }

      openCell(x, y)
      updateVisibility()
    }
  }


  function openCell (x: number, y: number) {
    $game.cells.opened = [...$game.cells.opened, [x, y]]
  }

  function markCell (x: number, y: number) {
    $game.cells.marked = [...$game.cells.marked, [x, y]]
  }

  function isCellMarked (x: number, y: number) {
    return includePoint($game.cells.marked, [x, y])
  }

  function isCellHidden (x: number, y: number) {
    return !includePoint($visibleCells, [x, y]) && $game.time.endedAt == null
  }

  function loseGame () {
    stopHandlingTime()
    $game.time.endedAt = new Date()
    showLossModal = true
  }

  function endGame () {
    stopHandlingTime()
    $game.time.endedAt = new Date()
    showWinModal = true
  }
</script>

<main>
    <div class="back">
        <IconButton on:click={() => goto('./')}>
            <ArrowLeft size="25px"/>
            <p>Back to menu</p>
        </IconButton>
    </div>
    <div class="minesweeper">
        {#if showLossModal}
            <Modal on:close={() => showLossModal = false}>
                <p>You've been bombed!</p>
                <MenuButton on:click={() => goto('./')}>Back to menu</MenuButton>
            </Modal>
        {:else if showWinModal}
            <Modal on:close={() => showWinModal = false}>
                <p>You won the game!!</p>
                <p>It took you <strong>{$game.time.elapsedTime}</strong> seconds</p>
                <MenuButton on:click={() => goto('./')}>Back to menu</MenuButton>
            </Modal>
        {/if}
        <div class="game-info">
            <div class="counter">
                <p>💣</p>
                <p>{$game.grid.bombs - $game.cells.marked.length}</p>
            </div>
            <p class="timer">{$game.time.elapsedTime}S</p>
        </div>
        <div class="game">
            {#each map.entries() as [x, row]}
                <div class="row">
                    {#each row.entries() as [y, content]}
                        <Cell
                                bind:content
                                on:mousedown={(e) => mouseDown(e.button === 2, x, y)}
                                on:longtouch={() => mouseDown(true, x, y)}
                                index={(x + 1) * map.length + y + 1}
                                marked={isCellMarked(x, y)}
                                hidden={isCellHidden(x, y)}
                        >
                        </Cell>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
    <div class="filler"></div>
</main>

<style>
    main {
        flex: 1 0 0;
        justify-content: space-between;
    }

    .back, .filler {
        flex-grow: 1;
    }

    .back {
        display: flex;
        align-items: flex-start;
        align-self: stretch;
        justify-content: center;

        & svg {
            fill: rgba(var(--quaternary-color), 0.9);
        }

        & p {
            font-weight: 400;
            color: rgba(var(--quaternary-color), 0.9)
        }
    }

    .game-info {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 10px;

        & p {
            font-size: 14px;
            font-weight: 400;
            color: rgba(var(--quaternary-color), 0.9)
        }

        & .counter {
            display: inline-flex;
            align-items: baseline;
            justify-content: center;
            gap: 10px;
        }
    }

    .game, .row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .game {
        flex-direction: column;
    }
</style>
