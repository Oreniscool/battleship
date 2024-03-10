function Ship(length) {
  let hits = 0;
  let sunk = false;
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => {
    if (hits == length) {
      sunk = true;
    }
    return sunk;
  };
  return { hits, hit, isSunk, length };
}

function Gameboard() {
  let grid = [];
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
  return { place };
}

const gameboard = Gameboard();

module.exports = { gameboard };
