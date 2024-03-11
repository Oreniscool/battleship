import { player1, player2 } from './battleship.js';

const grid = (function () {
  const initialise = () => {
    const grid1 = document.querySelector('.player1');
    const grid2 = document.querySelector('.player2');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.setAttribute('x', j);
        gridItem.setAttribute('y', i);
        grid1.appendChild(gridItem);
      }
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.setAttribute('x', j);
        gridItem.setAttribute('y', i);
        grid2.appendChild(gridItem);
      }
    }
    getTestBoardSetup();
  };
  const getTestBoardSetup = () => {
    const grid1 = document.querySelector('.player1');
    //placing ships
    player1.placeShip({
      length: 5,
      position: [0, 0],
      alignment: 'horizontal',
    });
    try {
      player1.placeShip({
        length: 2,
        position: [0, 0],
        alignment: 'horizontal',
      });
    } catch (err) {
      console.error(err);
    }
    player1.placeShip({
      length: 4,
      position: [0, 2],
      alignment: 'vertical',
    });

    const grid = player1.getGameboard().getGrid();
    grid.forEach((ship) => {
      const occupied = document.createElement('div');
      occupied.classList.add('occupied');
      for (let i = 0; i < ship.occupied.length; i++) {
        const position = ship.occupied[i];
        const occPos = document.querySelector(
          `div[x="${position[0]}"][y="${position[1]}"]`
        );
        occPos.style.backgroundColor = '#83e6e4';
        occPos.style.border = '1px #40dee3 solid';
      }
    });
  };
  return { initialise };
})();

grid.initialise();
