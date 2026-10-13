import { spawn } from 'node:child_process';

const processes = ['server', 'dev'].map((script) =>
  spawn('npm', ['run', script], { stdio: 'inherit' }),
);

let stopping = false;
const stop = (code = 0) => {
  if (stopping) return;
  stopping = true;
  for (const child of processes) child.kill('SIGTERM');
  process.exitCode = code;
};

for (const child of processes) {
  child.on('error', (error) => {
    console.error(error);
    stop(1);
  });
  child.on('exit', (code) => stop(code || 0));
}

process.on('SIGINT', () => stop(130));
process.on('SIGTERM', () => stop(143));
