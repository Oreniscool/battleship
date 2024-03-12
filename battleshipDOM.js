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
    // placeComputerShips();
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

    player2.placeShip({
      length: 5,
      position: [0, 0],
      alignment: 'horizontal',
    });
    player2.placeShip({
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

const rounds = (function () {
  const header = document.querySelector('.header');
  const start = () => {
    let pos;
    let i = 0;
    const grid2 = document.querySelector('.player2');
    const grid2Items = grid2.querySelectorAll(':scope > *');
    const playerTurn = (i) => {
      Array.from(grid2Items).forEach((item) => {
        item.addEventListener('click', handleClick);
      });
    };
    const computerTurn = (i) => {
      const header = document.querySelector('.header');
      //Computer attacks
      let attackDetails = player1.randomRecieveAttack();
      const grid1 = document.querySelector('.player1');
      console.log(attackDetails);
      const box = grid1.querySelector(
        `:scope > div[x="${attackDetails.position[0]}"][y="${attackDetails.position[1]}"]`
      );
      if (attackDetails.flag) {
        box.textContent = '💥';
      } else {
        box.textContent = '✖️';
      }
      if (!checkLoss('computer')) {
        chooseRounds(i + 1);
      } else {
        header.textContent = `Computer Wins!`;
      }
    };
    const handleClick = (e) => {
      const header = document.querySelector('.header');
      pos = getAttackPos(e.target);
      handleAttack(player2.recieveAttack(pos), pos);
      Array.from(grid2Items).forEach((item) => {
        item.removeEventListener('click', handleClick);
      });

      if (!checkLoss('player')) {
        chooseRounds(i + 1);
      } else {
        header.textContent = 'Player Wins!';
      }
    };
    const chooseRounds = (i) => {
      if (i % 2 == 0) {
        header.textContent = 'Player turn';
        playerTurn(i);
      } else if (i % 2 == 1) {
        header.textContent = 'Computer turn';
        setTimeout(() => computerTurn(i), 3000);
      }
    };
    chooseRounds(i);
  };
  const handleAttack = (flag, pos) => {
    const grid2 = document.querySelector('.player2');
    const box = grid2.querySelector(
      `:scope > div[x="${pos[0]}"][y="${pos[1]}"]`
    );
    if (flag) {
      box.textContent = '💥';
    } else {
      box.textContent = '✖️';
    }
  };
  const checkLoss = (turn) => {
    let flag;
    if (turn == 'computer') {
      flag = true;
      for (let i = 0; i < player1.getGameboard().getGrid().length; i++) {
        if (!player1.getGameboard().getGrid()[i].ship.sunk) {
          flag = false;
        }
      }
    }
    if (turn == 'player') {
      flag = true;
      for (let i = 0; i < player2.getGameboard().getGrid().length; i++) {
        if (!player2.getGameboard().getGrid()[i].ship.sunk) {
          flag = false;
        }
      }
    }
    return flag;
  };
  const getAttackPos = (element) => {
    console.log(element);
    return [
      parseInt(element.getAttribute('x')),
      parseInt(element.getAttribute('y')),
    ];
  };
  return { start };
})();

grid.initialise();

const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
  rounds.start();
  startButton.style.display = 'none';
});
