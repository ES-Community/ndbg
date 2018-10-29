import { spawnSync } from 'child_process';
import { join } from 'path';

export default function traceRequires(argv) {
  const { script } = argv;
  const node = process.argv[0];
  const { stdout } = spawnSync(node, [
    '-r',
    join(__dirname, '../logRequiresPreload.js'),
    script
  ]);
  const lines = stdout
    .toString('utf8')
    .split('\n')
    .map((line) => line.substring('loadingModule '.length))
    .filter((line) => line !== '');
  for (const line of lines) {
    process.stdout.write(line + '\n');
  }
}
