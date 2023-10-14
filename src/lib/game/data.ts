import type { GameLevel } from '$lib/game/types'

export const levels: GameLevel[] = [
  {
    name: 'Easy',
    bombs: 10,
    width: 10,
    height: 10,
    color: 'rgba(27, 153, 139, 0.3)'
  },
  {
    name: 'Medium',
    bombs: 25,
    width: 10,
    height: 15,
    color: 'rgba(240, 159, 36, 0.3)'
  },
  {
    name: 'Hard',
    bombs: 50,
    width: 10,
    height: 20,
    color: 'rgba(240, 36, 36, 0.3)'
  },
  {
    name: 'Custom',
    bombs: 100,
    width: 10,
    height: 20,
    color: 'rgba(217, 212, 237, 1)'
  }
]

