import {getInput} from "../util";

async function partOne() {
  const sample = false;
  const input = await getInput(4, sample);
  const grid = buildGrid(input);

  let total = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      total += checkPosition(grid, row, col);
    }
  }

  return total;
}

function buildGrid(input: string[]): string[][] {
  return input.map((line) => line.split(''));
}

function checkPosition(grid: string[][], row: number, col: number): number {
  let total = 0;
  total += checkXmasRight(grid[row], col) ? 1 : 0;
  total += checkXmasLeft(grid[row], col) ? 1 : 0;
  total += checkXmasDown(grid, row, col) ? 1 : 0;
  total += checkXmasUp(grid, row, col) ? 1 : 0;
  total += checkUpRightDiagonal(grid, row, col) ? 1 : 0;
  total += checkUpLeftDiagonal(grid, row, col) ? 1 : 0;
  total += checkDownRightDiagonal(grid, row, col) ? 1 : 0;
  total += checkDownLeftDiagonal(grid, row, col) ? 1 : 0;

  // const rotated = orientGridByColumn(grid);
  // console.log(rotated);
  return total;
}

function checkXmasRight(row: string[], col: number): boolean {
  return row.slice(col, col + 4).join('') === 'XMAS';
}

function checkXmasLeft(row: string[], col: number): boolean {
  return row.slice(col - 3, col + 1).reverse().join('') === 'XMAS';
}

function checkXmasDown(grid: string[][], row: number, col: number): boolean {
  return grid.slice(row, row + 4).map((r) => r[col]).join('') === 'XMAS';
}

function checkXmasUp(grid: string[][], row: number, col: number): boolean {
  return grid.slice(row - 3, row + 1).map((r) => r[col]).reverse().join('') === 'XMAS';
}

function checkUpRightDiagonal(grid: string[][], row: number, col: number): boolean {
  if (row < 3 || col > grid[row].length - 4) {
    return false;
  }

  const chars = [
    grid[row][col],
    grid[row - 1][col + 1],
    grid[row - 2][col + 2],
    grid[row - 3][col + 3],
  ];

  return chars.join('') === 'XMAS';
}

function checkUpLeftDiagonal(grid: string[][], row: number, col: number): boolean {
  if (row < 3 || col < 3) {
    return false;
  }

  const chars = [
    grid[row][col],
    grid[row - 1][col - 1],
    grid[row - 2][col - 2],
    grid[row - 3][col - 3],
  ];

  return chars.join('') === 'XMAS';
}

function checkDownRightDiagonal(grid: string[][], row: number, col: number): boolean {
  if (row > grid.length - 4 || col > grid[row].length - 4) {
    return false;
  }

  const chars = [
    grid[row][col],
    grid[row + 1][col + 1],
    grid[row + 2][col + 2],
    grid[row + 3][col + 3],
  ];

  return chars.join('') === 'XMAS';
}

function checkDownLeftDiagonal(grid: string[][], row: number, col: number): boolean {
  if (row > grid.length - 4 || col < 3) {
    return false;
  }

  const chars = [
    grid[row][col],
    grid[row + 1][col - 1],
    grid[row + 2][col - 2],
    grid[row + 3][col - 3],
  ];

  return chars.join('') === 'XMAS';
}

async function partTwo() {
  const sample = false;
  const input = await getInput(4, sample);
  const grid = buildGrid(input);

  let total = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      total += checkSam(grid, row, col) ? 1 : 0;
    }
  }

  return total;
}

function checkSam(grid, row, col): boolean {
  if (grid[row][col] !== 'A') return false;
  if (row < 1 || col < 1) return false;
  if (row > grid.length - 2 || col > grid[row].length - 2) return false;

  const tl = grid[row - 1][col - 1];
  const tr = grid[row - 1][col + 1];
  const bl = grid[row + 1][col - 1];
  const br = grid[row + 1][col + 1];
  const c = grid[row][col];

  const ltor = [tl, c, br].join('');
  const rtol = [tr, c, bl].join('');

  return (ltor === 'SAM' || ltor === 'MAS') && (rtol === 'SAM' || rtol === 'MAS');
}

// partOne().then(console.log);
partTwo().then(console.log);