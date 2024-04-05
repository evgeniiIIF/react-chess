/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Board } from '../../models/Board';
import { CellComponent } from '../CellComponent/CellComponent';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import { Colors } from '../../models/Colors';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const click = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  return (
    <>
      <div className='board'>
        {board.cells.map((row, index) => {
          return (
            <React.Fragment key={index}>
              {row.map((cell) => {
                return (
                  <CellComponent
                    selected={
                      cell.x === selectedCell?.x &&
                      cell.y === selectedCell?.y &&
                      !!selectedCell.figure
                    }
                    cell={cell}
                    key={cell.id}
                    click={click}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
