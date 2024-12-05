import {getInput} from "../util";

async function partOne() {
  const sample = false;
  const input = await getInput(3, sample);
  const instructions = input.join('');

  let total = 0;
  let index = 0;
  while (index < instructions.length) {
    // if (instructions.substring(index, index + 3) === 'mul') {
    const matches = instructions.substring(index).match(/^mul\((\d+),(\d+)\)/)
    if (matches) {
      total += parseInt(matches[1]) * parseInt(matches[2]);
    }
    index++;
  }
  return total;
}

async function partTwo() {
  const sample = false;
  const input = await getInput(3, sample);
  const instructions = input.join('');

  let total = 0;
  let index = 0;
  let enabled = true;
  while (index < instructions.length) {
    if (enabled) {
      let matches = instructions.substring(index).match(/^mul\((\d+),(\d+)\)/)
      if (matches) {
        total += parseInt(matches[1]) * parseInt(matches[2]);
      } else {
        matches = instructions.substring(index).match(/^don't\(\)/)
        if (matches) {
          enabled = false;
        }
      }
    } else {
      const matches = instructions.substring(index).match(/^do\(\)/)
      if (matches) {
        enabled = true;
      }
    }
    index++;
  }
  return total;
}

// partOne().then(console.log);
partTwo().then(console.log);