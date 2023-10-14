export type Point = [number, number]

export interface Grid {
  width: number
  height: number
  bombs: number
}

export type GameLevel = Grid & {
  name: string,
  color: string
}

export interface Timer {
  startedAt: Date | null,
  endedAt: Date | null,
  elapsedTime: number
}

export interface Game {
  grid: Grid
  seed: number,
  time: Timer
  cells: {
    opened: Point[],
    marked: Point[]
  }
}
