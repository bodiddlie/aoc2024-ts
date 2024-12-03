import {getInput} from "../util";

function getColumns(input: string[]): [number[], number[]] {
  const left = [];
  const right = [];
  for (const line of input) {
    const nums = line.split(/\s+/).map(Number);
    left.push(nums[0]);
    right.push(nums[1]);
  }

  return [left, right];
}

async function partOne() {
  const sample = false;
  const input = await getInput(1, sample);
  const [left, right] = getColumns(input);

  left.sort();
  right.sort();

  let total = 0;
  for (let i = 0; i < left.length; i++) {
    const distance = Math.abs(left[i] - right[i]);
    total += distance;
  }

  console.log(total);
}

async function partTwo() {
  const sample = false;
  const input = await getInput(1, sample);
  const [left, right] = getColumns(input);

  let total = 0;

  for (const num of left) {
    const occurences = right.filter((n) => n === num).length;
    total += num * occurences;
  }

  console.log(total);
}

partOne().then(() => {});
// partTwo().then(() => {});