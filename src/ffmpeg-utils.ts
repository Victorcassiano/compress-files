import { spawn } from 'child_process';
import { join } from 'path';
import { outputPath } from './config';
import { Crf, Preset } from './enum';

export function parseDurationToSeconds(duration: string): number {
  const [hh, mm, ss] = duration.split(':').map(parseFloat);

  if(hh === undefined || mm === undefined || ss === undefined) return 0
  
  return hh * 3600 + mm * 60 + ss;
}

export function getVideoDuration(file: string): Promise<number> {
  return new Promise((resolve) => {
    const ffprobe = spawn('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      file
    ]);

    let data = '';
    ffprobe.stdout.on('data', chunk => data += chunk.toString());
    ffprobe.on('close', () => resolve(parseFloat(data.trim())));
  });
}

export function compressVideo(input: string, output: string, durationSeconds: number, onProgress: (currentTime: number) => void): Promise<void> {
  return new Promise<void>((resolve) => {
    const ffmpeg = spawn('ffmpeg', [
      '-i', input,
      '-vcodec', 'libx264',
      '-crf', Crf.BALANCED,
      '-preset', Preset.SLOW,
      '-acodec', 'aac',
      '-b:a', '128k',
      output
    ]);

    ffmpeg.stderr.on('data', (data) => {
      const str = data.toString();
      const match = str.match(/time=(\d+:\d+:\d+\.\d+)/);
      if (match) {
        const currentTime = parseDurationToSeconds(match[1]);
        onProgress(currentTime);
      }
    });

    ffmpeg.on('close', () => resolve());
  });
}

export async function compressAudio(
  input: string, 
  output: string, 
  duration: number, 
  onProgress: (current: number) => void
): Promise<void> {
  return new Promise<void>((resolve) => {
    const ffmpeg = spawn('ffmpeg', [
      '-i', input,
      '-codec:a', 'libmp3lame',
      '-q:a', '2',
      output
    ]);

    ffmpeg.stderr.on('data', (data) => {
      const match = data.toString().match(/time=(\d+:\d+:\d+\.\d+)/);
      if (match) {
        const currentTime = parseDurationToSeconds(match[1]);
        onProgress(currentTime);
      }
    });

    ffmpeg.on('close', resolve);
  });
}

export const getOutputPath = (folderName: string) => join(outputPath, folderName);