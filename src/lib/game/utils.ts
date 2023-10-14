import type { Game, Point } from '$lib/game/types'
import type { RandomGenerator } from 'pure-rand'
import prand from 'pure-rand'

export function randomSeed () {
  return Math.random() * 1000
}

export function createMap (width = 10, height = 10, fillWith = 0) {
  return Array(height).fill(null).map(() => Array(width).fill(fillWith))
}

export function includePoint (pointMap: Point[], [x, y]: Point) {
  return pointMap.some(p => p[0] === x && p[1] === y)
}

export interface FillBombsProps {
  map: number[][],
  bombCount: number,
  startPoint: Point,
  rng: RandomGenerator
}

export function fillBombs ({ map, bombCount, startPoint, rng }: FillBombsProps) {
  const height = map.length
  const width = map[0].length

  console.log({ map, bombCount, startPoint, rng })

  let bombs = 0
  while (bombs < bombCount) {
    const x = prand.unsafeUniformIntDistribution(0, height - 1, rng)
    const y = prand.unsafeUniformIntDistribution(0, width - 1, rng)

    //if (x - startPoint[0] > 1 || y - startPoint[1] > 1) {
    if (Math.abs(x - startPoint[0]) > 1 || Math.abs(y - startPoint[1]) > 1) {
      if (map[x][y] == 0) {
        bombs += 1
        map[x][y] = -1
      }
    }
  }

  return map
}

export function getNeighbors (map: number[][], [x, y]: Point) {
  let neighbors: Point[] = []
  for (let i = Math.max(0, x - 1); i <= Math.min(map.length - 1, x + 1); i++) {
    for (let j = Math.max(0, y - 1); j <= Math.min(map[i].length - 1, y + 1); j++) {
      if (i !== x || j !== y) {
        neighbors.push([i, j])
      }
    }
  }
  return neighbors
}

export function fillCoefficients (oMap: number[][]) {
  const map = [...oMap]
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (map[x][y] !== -1) {
        map[x][y] = getNeighbors(map, [x, y]).map(([x, y]) => map[x][y]).filter(n => n === -1).length
      }
    }
  }
  return map
}

export function getVisibleCells (map: number[][], openedCells: Point[], visibilityRadius = 3): Point[] {
  const stack: Point[] = [...openedCells]
  const visibleCells: Point[] = []

  while (stack.length > 0) {
    const [x, y] = stack.pop() as Point

    if (visibleCells.some(([i, j]) => i === x && j === y)) {
      continue
    }

    visibleCells.push([x, y])

    if (map[x][y] === 0) {
      // stack.push(...getNeighbors(map, [x, y])) // старый код
      const neighbors = getNeighbors(map, [x, y])
      neighbors.forEach(([nx, ny]) => {
        // проверяем только те клетки, которые находятся на расстоянии visibilityRadius по горизонтали или вертикали
        if (Math.abs(nx - x) + Math.abs(ny - y) <= visibilityRadius) {
          stack.push([nx, ny])
        }
      })
    }
  }

  return visibleCells
}

export function isGameOver (bombCount: number, map: number[][], opened: Point[], marked: Point[]): boolean {
  const totalCells = map.length * map[0].length
  const totalSafeCells = totalCells - bombCount
  const openedSafeCells = opened.filter(([x, y]) => map[x][y] !== -1).length
  const markedBombs = marked.filter(([x, y]) => map[x][y] === -1).length

  return openedSafeCells === totalSafeCells || markedBombs === bombCount
}
