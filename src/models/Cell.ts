import { Board } from './Board';
import { Colors } from './Colors';
import { Figure } from './figures/Figure';

export class Cell {
  board: Board;
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  available: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmpty() {
    return this.figure === null;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) {
      return false;
    }
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      const x = this.x + dx * i;
      const y = this.y + dy * i;
      console.log(target, this);

      if (!this.board.getCell(x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure);
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure?.moveFigure(target);
      if (target.figure) {
        this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
