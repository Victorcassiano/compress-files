import { join } from 'path';
import cliProgress from 'cli-progress';
import { outputPath } from './config';
import { ensureOutputDirectory, preserveTimestamps } from './file-utils';
import { getInputPath, chooseFiles } from './prompts';
import { getVideoDuration, compressVideo } from './ffmpeg-utils';


(async () => {
  ensureOutputDirectory(outputPath);

  const inputPath = await getInputPath();
  const files = await chooseFiles(inputPath);

  console.clear();

  const mainProgressBar = new cliProgress.SingleBar({
    fps: 1,
    hideCursor: true,
    format: 'Overall Progress |{bar}| {value}/{total} files',
  }, cliProgress.Presets.shades_classic);

  const showMainProgressBar = files.length > 1;
  if (showMainProgressBar) mainProgressBar.start(files.length, 0);

  for (const [index, name] of files.entries()) {
    const src = join(inputPath, name);
    const dest = join(outputPath, name);

    if(index > 0) console.clear()
    
    if (showMainProgressBar) {
      mainProgressBar.update(index);
      process.stdout.write(`\n${name}\n`);
    }

    const duration = await getVideoDuration(src);

    const fileProgressBar = new cliProgress.SingleBar({
      fps: 5,
      clearOnComplete: true,
      hideCursor: true,
      format: '|{bar}| {percentage}% | ETA: {eta}s',
    }, cliProgress.Presets.shades_classic);

    fileProgressBar.start(duration, 0);

    await compressVideo(src, dest, duration, current => {
      fileProgressBar.update(Math.min(current, duration));
    });

    fileProgressBar.update(duration);
    fileProgressBar.stop();

    preserveTimestamps(src, dest);
  }

  if (showMainProgressBar) {
    mainProgressBar.update(files.length);
    mainProgressBar.stop();
  }

  console.log('\n✅ All files have been processed.');
})();
