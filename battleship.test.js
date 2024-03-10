const battleship = require('./battleship.js');

describe('Testing placement', () => {
  test('Does placement work(horizontal)', () => {
    expect(
      battleship.gameboard.place({
        length: 5,
        position: [0, 0],
        alignment: 'horizontal',
      })
    ).toStrictEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ]);
  });
  test('Does placement work(vertical)', () => {
    expect(
      battleship.gameboard.place({
        length: 5,
        position: [9, 0],
        alignment: 'vertical',
      })
    ).toStrictEqual([
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
    ]);
  });
  test('Placement doesnt break game boundaries', () => {
    expect(() => {
      battleship.gameboard.place({
        length: 4,
        position: [0, 9],
        alignment: 'vertical',
      });
    }).toThrow('Incorrect placement');
    expect(() => {
      battleship.gameboard.place({
        length: 4,
        position: [8, 6],
        alignment: 'horizontal',
      });
    }).toThrow('Incorrect placement');
  });
  test('Placement doesnt superimpose ships', () => {
    expect(
      battleship.gameboard.place({
        length: 2,
        position: [0, 1],
        alignment: 'vertical',
      })
    ).toStrictEqual([
      [0, 1],
      [0, 2],
    ]);
    expect(() => {
      battleship.gameboard.place({
        length: 2,
        position: [0, 2],
        alignment: 'vertical',
      });
    }).toThrow('Incorrect placement');
    expect(() => {
      battleship.gameboard.place({
        length: 3,
        position: [0, 2],
        alignment: 'horizontal',
      });
    }).toThrow('Incorrect placement');
  });
  test('Placement doesnt superimpose ships on the edges', () => {
    expect(() => {
      battleship.gameboard.place({
        length: 2,
        position: [8, 2],
        alignment: 'horizontal',
      });
    }).toThrow('Incorrect placement');
  });
  test('Placement doesnt superimpose ships on through it', () => {
    expect(
      battleship.gameboard.place({
        length: 2,
        position: [5, 6],
        alignment: 'vertical',
      })
    ).toStrictEqual([
      [5, 6],
      [5, 7],
    ]);
    expect(() => {
      battleship.gameboard.place({
        length: 3,
        position: [4, 7],
        alignment: 'horizontal',
      });
    }).toThrow('Incorrect placement');
  });
});

describe('Testing attacks', () => {
  test('Miss works', () => {
    expect(battleship.gameboard.recieveAttack([1, 1])).toBe(0); //miss
  });
  test('Hit works', () => {
    expect(battleship.gameboard.recieveAttack([1, 0])).toBe(1); //hit
  });
  test('Out of bounds is handled', () => {
    expect(() => {
      battleship.gameboard.recieveAttack([-1, 0]);
    }).toThrow('Incorrect attack');
  });
  test('Prevent multiple attacks on same location', () => {
    battleship.gameboard.recieveAttack([2, 5]);
    expect(() => {
      battleship.gameboard.recieveAttack([2, 5]);
    }).toThrow('Incorrect attack');
  });
});
