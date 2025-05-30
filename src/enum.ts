export enum Preset {
  // Oferece a codificação mais rápida, mas com a menor compressão e maior tamanho de arquivo.
  ULTRAFAST = "ultrafast",
  // Rápido, mas com compressão um pouco melhor que o ultrafast.
  SUPERFAST = "superfast",
  // Equilíbrio entre velocidade e compressão, com uma codificação relativamente rápida.
  VERYFAST = "veryfast",
  // Um pouco mais lento que veryfast, mas com melhor compressão.
  FASTER = "faster",
  // Boa compressão com velocidade de codificação razoável.
  FAST = "fast",
  // Padrão do FFmpeg, oferece um equilíbrio entre velocidade e compressão.
  MEDIUM = "medium",
  // Mais lento que medium, mas com melhor compressão e qualidade.
  SLOW = "slow",
  // Oferece uma compressão ainda melhor, mas com velocidade de codificação mais lenta.
  SLOWER = "slower",
  // Oferece a melhor compressão e qualidade, mas é o mais lento.
  VERYSLOW = "veryslow"
}

export enum Crf {
  BEST_QUALITY = "0",
  HIGH_QUALITY = "18",
  GOOD_QUALITY = "23",
  BALANCED = "25",
  STANDARD_QUALITY = "28",
  SMALLER_FILE = "35",
  WORST_QUALITY = "51"
}