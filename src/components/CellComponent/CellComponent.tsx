import { FC } from 'react';
import { Cell } from '../../models/Cell';
import { click } from '@testing-library/user-event/dist/click';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

export const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
      style={{ background: cell.figure && cell.available ? 'green' : '' }}
      onClick={() => click(cell)}
    >
      {cell.figure?.logo && <img src={cell.figure.logo} alt='some' />}
      {cell.available && !cell.figure && <div className='available'></div>}
    </div>
  );
};
