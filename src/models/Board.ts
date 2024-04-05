import { Cell } from './Cell';
import { Colors } from './Colors';
import { Queen } from './figures/Queen';
import { Pawn } from './figures/Pawn';
import { King } from './figures/King';
import { Bishop } from './figures/Bishop';
import { Knight } from './figures/Knight';
import { Rock } from './figures/Rook';
import { Figure } from './figures/Figure';

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); //черные
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); //белые
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public addFigures() {
    this.addBishop();
    this.addKing();
    this.addKnight();
    this.addPawn();
    this.addQueen();
    this.addRook();
  }

  private addBishop() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }
  private addKing() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }
  private addKnight() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }
  private addPawn() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }
  private addQueen() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }
  private addRook() {
    new Rock(Colors.BLACK, this.getCell(0, 0));
    new Rock(Colors.BLACK, this.getCell(7, 0));
    new Rock(Colors.WHITE, this.getCell(0, 7));
    new Rock(Colors.WHITE, this.getCell(7, 7));
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = Boolean(selectedCell?.figure?.canMove(target));
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }
}
