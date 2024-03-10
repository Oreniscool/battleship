function Ship(length) {
  let hits = 0;
  let sunk = false;
  function hit() {
    this.hits += 1;
    this.isSunk();
  }
  function isSunk() {
    if (this.hits == this.length) {
      this.sunk = true;
    }
  }
  return { hits, sunk, hit, isSunk, length };
}

function Gameboard() {
  let grid = [];
  let attacks = [];
  //Place logic begins
  const place = (placement) => {
    if (checkPlacement(placement)) throw new TypeError('Incorrect placement');
    const newShip = Ship(placement.length);
    let occupied = getOccupied(placement);
    grid.push({ ship: newShip, occupied: occupied });
    return occupied;
  };
  const getOccupied = (placement) => {
    let occupied = [];
    if (placement.alignment == 'vertical') {
      for (
        let i = placement.position[1];
        i < placement.length + placement.position[1];
        i++
      ) {
        occupied.push([placement.position[0], i]);
      }
    } else if (placement.alignment == 'horizontal') {
      for (
        let i = placement.position[0];
        i < placement.length + placement.position[0];
        i++
      ) {
        occupied.push([i, placement.position[1]]);
      }
    }
    return occupied;
  };
  const checkPlacement = (placement) => {
    if (checkConflicts(placement)) return true;
    if (placement.alignment == 'vertical') {
      if (placement.position[1] + placement.length > 10) return true;
    } else if (placement.alignment == 'horizontal') {
      if (placement.position[0] + placement.length > 10) return true;
    }
  };
  const checkConflicts = (placement) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < placement.length; j++) {
        if (placement.alignment == 'vertical') {
          if (
            grid[i].occupied.some((occPos) =>
              shallowEqualityCheck(occPos, [
                placement.position[0],
                placement.position[1] + j,
              ])
            )
          ) {
            return true;
          }
        } else if (placement.alignment == 'horizontal') {
          if (
            grid[i].occupied.some((occPos) =>
              shallowEqualityCheck(occPos, [
                placement.position[0] + j,
                placement.position[1],
              ])
            )
          ) {
            return true;
          }
        }
      }
    }
  };
  const shallowEqualityCheck = (item, value) => {
    if (item[0] == value[0] && item[1] == value[1]) return true;
    return false;
  };
  //Place logic ends
  //Attack logic begins
  const recieveAttack = (position) => {
    let flag = 0;
    if (checkAttack(position)) throw new TypeError('Incorrect attack');
    for (let i = 0; i < grid.length; i++) {
      if (
        grid[i].occupied.some((occPos) =>
          shallowEqualityCheck(occPos, position)
        )
      ) {
        grid[i].ship.hit();
        grid[i].ship.isSunk();
        flag = 1;
        break;
      }
    }
    attacks.push(position);
    return flag;
  };
  const checkAttack = (pos) => {
    if (pos[0] < 0 || pos[0] >= 10 || pos[1] < 0 || pos[0] >= 10) return true;
    if (attacks.some((attack) => shallowEqualityCheck(attack, pos)))
      return true;
    return false;
  };
  return { place, recieveAttack };
}

const gameboard = Gameboard();

module.exports = { gameboard };
