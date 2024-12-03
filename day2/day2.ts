import {getInput} from "../util";

type Direction = 'inc' | 'dec';

function buildReports(input: string[]): number[][] {
  const reports = [];
  for (const line of input) {
    const nums = line.split(/\s+/).map(Number);
    reports.push(nums);
  }

  return reports;
}

function isReportSafe(report: number[]): boolean {
  let diff = report[0] - report[1];
  if (diff === 0 || Math.abs(diff) > 3) {
    return false;
  }
  const initialDirection = diff > 0 ? 'dec': 'inc';

  for (let i = 1; i < report.length - 1; i++) {
    diff = report[i] - report[i + 1];
    const direction = diff > 0 ? 'dec': 'inc';
    if (diff === 0 || direction !== initialDirection || Math.abs(diff) > 3) {
      return false;
    }
  }

  return true;
}

function dampnedReportIsSafe(report: number[], alreadyRemoved: boolean = false): boolean {
  let safe = isReportSafe(report);
  if (safe) {
    return true;
  }

  if (alreadyRemoved) {
    return false;
  }

  for (let i = 0; i < report.length; i++) {
    const copy = [...report];
    copy.splice(i, 1);
    safe = isReportSafe(copy);
    if (safe) {
      return true;
    }
  }

  return false;
}

async function partOne() {
  const sample = false;
  const input = await getInput(2, sample);
  const reports = buildReports(input);

  const total = reports.filter(isReportSafe).length;
  return total;
}

async function partTwo() {
  const sample = false;
  const input = await getInput(2, sample);
  const reports = buildReports(input);

  const total = reports.filter((r) => dampnedReportIsSafe(r)).length;
  return total;
}

// partOne().then(console.log);
partTwo().then(console.log);