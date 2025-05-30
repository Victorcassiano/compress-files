import prompts from 'prompts';
import { readdirSync } from 'fs';

export async function getInputPath(): Promise<string> {
  const { path } = await prompts({
    type: 'text',
    name: 'path',
    message: 'Path',
  });

  return path.trim();
}

export async function chooseFiles(basePath: string, fileType: string): Promise<string[]> {
  const items = readdirSync(basePath)
    .filter(file => file.toLowerCase().endsWith(`.${fileType}`));

  if (items.length === 0) {
    console.log(`Nenhum arquivo .${fileType} encontrado no diretório.`);
    process.exit(1)
  }

  const { mode } = await prompts({
    type: 'select',
    name: 'mode',
    message: 'Do you want to compress all files or choose one?',
    choices: [
      { title: 'Compress all', value: 'all' },
      { title: 'Select one', value: 'one' },
    ],
  });

  if (mode === 'all') return items;

  const { file } = await prompts({
    type: 'select',
    name: 'file',
    message: 'Choose a file to compress:',
    choices: items.map(name => ({ title: name, value: name })),
  });

  return [file];
}

export async function chooseFileType(): Promise<string> {
  const { fileType } = await prompts({
    type: 'select',
    name: 'fileType',
    message: 'Selecione o tipo de arquivo para compressão:',
    choices: [
      { title: 'Vídeo (MP4)', value: 'mp4' },
      { title: 'Áudio (MP3)', value: 'mp3' },
    ],
  });

  return fileType;
}
