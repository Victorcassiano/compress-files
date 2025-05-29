import { existsSync, mkdirSync, statSync, utimesSync } from 'fs';

export function ensureOutputDirectory(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

export function preserveTimestamps(src: string, dest: string) {
  const stats = statSync(src);
  utimesSync(dest, stats.atime, stats.mtime);
}
