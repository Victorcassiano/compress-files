import { join, basename } from 'path';
import { ensureOutputDirectory, preserveTimestamps } from './file-utils';
import { getInputPath, chooseFiles, chooseFileType } from './prompts';
import { getVideoDuration, getOutputPath } from './ffmpeg-utils';
import { createProgressBar } from './progress-bar';
import { getCompressor } from './compressors';


(async () => {
  const formatSelect = await chooseFileType()
  const inputPath = await getInputPath();
  const folderName = basename(inputPath);
  const outputPath = getOutputPath(folderName);

  ensureOutputDirectory(outputPath);

  const files = await chooseFiles(inputPath, formatSelect);

  console.clear();

  const mainProgressBar = createProgressBar({ total: files.length });

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

    const fileProgressBar = createProgressBar({
      title: name,
      total: duration,
      fps: 5,
    });;

    fileProgressBar.start(duration, 0);

    const compressor = getCompressor(formatSelect);
    await compressor(src, dest, duration, current => {
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
