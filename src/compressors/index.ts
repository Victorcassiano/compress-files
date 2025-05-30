import { compressAudio, compressVideo } from '../ffmpeg-utils';

type CompressFunction = (
  input: string,
  output: string,
  duration: number,
  onProgress: (current: number) => void
) => Promise<void>;

const compressors: Record<string, CompressFunction> = {
  mp4: compressVideo,
  mp3: compressAudio,
};

export function getCompressor(fileType: string): CompressFunction {
  const compressor = compressors[fileType];
  if (!compressor) {
    throw new Error(`Tipo de arquivo não suportado: ${fileType}`);
  }
  return compressor;
}