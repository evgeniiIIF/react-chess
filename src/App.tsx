import { useEffect, useState } from 'react';
import './App.scss';
import { BoardComponent } from './components/BoardComponent/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { LostFiguresComponent } from './components/LostFiguresComponent/LostFiguresComponent';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer);
  };

  return (
    <div className='app'>
      <div className='app__col'>
        <h1 className='title'>
          Ходят {currentPlayer?.color === Colors.BLACK ? 'Черные' : 'Белые'}
        </h1>
        <div className='app__row'>
          <LostFiguresComponent title='Черные фигуры' figures={board.lostBlackFigures} />
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
          />
          <LostFiguresComponent title='Белые фигуры' figures={board.lostWhiteFigures} />
        </div>
      </div>
    </div>
  );
}

export default App;
