import cliProgress, { SingleBar } from 'cli-progress';

type ProgressBarOptions = {
  title?: string;
  total: number;
  fps?: number;
  showWhenSingle?: boolean;
}

export function createProgressBar({ 
  title = '', 
  fps = 1, 
}: ProgressBarOptions): SingleBar {
  
  const bar = new cliProgress.SingleBar({
    fps,
    hideCursor: true,
    clearOnComplete: true,
    format: title 
      ? `{bar}| {percentage}% | ETA: {eta}s`
      : 'Overall Progress |{bar}| {value}/{total} files',
  }, cliProgress.Presets.shades_classic);


  return bar
}