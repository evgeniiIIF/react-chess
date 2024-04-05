import { FC } from 'react';
import { Figure } from '../../models/figures/Figure';

interface LostFiguresComponentProps {
  title: string;
  figures: Figure[];
}

export const LostFiguresComponent: FC<LostFiguresComponentProps> = ({ title, figures }) => {
  return (
    <div className='lost'>
      <h3 className='lost__title'>{title}</h3>
      {figures.map((figure) => {
        return (
          <div className='lost__item'>
            <p>{figure.name}</p>
            {figure.logo && <img src={figure.logo} alt={figure.name} />}
          </div>
        );
      })}
    </div>
  );
};
