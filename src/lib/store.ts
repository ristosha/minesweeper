import { levels } from '$lib/game/data'
import type { Game, Grid } from '$lib/game/types'
import { styles } from '$lib/styles'
import type { Style } from '$lib/styles'
import { persisted } from 'svelte-persisted-store'
import { writable } from 'svelte/store'

export const menu = writable<Grid>({
  width: levels[0].width,
  height: levels[0].height,
  bombs: levels[0].bombs
})

export const style = persisted<Style>('style', { ...styles[0] })

const defaultGame: Game = {
  seed: 0,
  grid: {
    width: levels[0].width,
    height: levels[0].height,
    bombs: levels[0].bombs
  },
  time: {
    startedAt: null,
    endedAt: null,
    elapsedTime: 0
  },
  cells: {
    opened: [],
    marked: []
  }
}

export const game = persisted<Game>('game', cloneDefaultGame())
// export const game = writable<Game>(Object.assign({}, defaultGame))

export function resetGame() {
  game.set(JSON.parse(JSON.stringify(defaultGame)))
}

function cloneDefaultGame() {
  return JSON.parse(JSON.stringify(defaultGame))
}
