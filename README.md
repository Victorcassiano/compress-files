
# Português (PT-BR)

## FFmpeg
FFmpeg é uma ferramenta de linha de comando para processar vídeos e áudios. Com ela, é possível converter formatos, extrair áudio, editar vídeos e compactar arquivos de mídia com eficiência. Um dos usos mais comuns do FFmpeg é reduzir o tamanho de vídeos mantendo boa qualidade.

##### Exemplo básico:
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 output.mp4
```
Explicação dos atributos:

-   `ffmpeg`: chama a ferramenta FFmpeg pela linha de comando.
-   `-i input.mp4`: indica o arquivo de **entrada** (`input.mp4`). O `-i` significa "input" (entrada).
-   `-vcodec libx264`: define o **codec de vídeo** a ser usado na saída.  
    `libx264` é o codec H.264 (um dos mais eficientes para compressão com boa qualidade).
-   `-crf 23`: define o **fator de taxa constante** (CRF = Constant Rate Factor).  
    Esse valor controla a **qualidade do vídeo**:
    -   Quanto **menor** o número, **maior** a qualidade e o tamanho do arquivo.
    -   Quanto **maior** o número, **menor** a qualidade e o tamanho.
    -   Valores comuns vão de 18 (alta qualidade) a 28 (compactação mais forte).
-   `output.mp4`: define o nome do **arquivo de saída** compactado.

Você pode baixar o FFmpeg diretamente do site oficial: 👉 [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

## Motivação do Projeto

A NVIDIA oferece um recurso muito útil para gamers: a gravação instantânea de clipes de jogo. Com ele, é possível salvar os últimos segundos ou minutos da gameplay — no meu caso, deixei configurado para salvar 1 minuto e 30 segundos.

Esse recurso é excelente para capturar jogadas legais ou momentos engraçados durante uma partida. No entanto, mesmo com essa curta duração, os arquivos gerados têm **altíssima qualidade**, o que resulta em vídeos com tamanhos desproporcionais: **alguns clipes de 1:30min ultrapassam os 500MB**.

### O Problema

Manter vários clipes desses ocupa muito espaço no disco rapidamente. Por exemplo, uma pasta contendo **26 clipes do jogo Overwatch 2** gerou um total de:

> **6,99 GB (7.507.008.672 bytes)**

Isso torna o gerenciamento e o armazenamento desses vídeos inviável com o tempo, especialmente em SSDs com espaço limitado.

### A Solução

A minha solução foi utilizar o **FFmpeg manualmente** para compactar os vídeos, reduzindo drasticamente o tamanho dos arquivos enquanto mantenho uma qualidade visual satisfatória. Com comandos simples de terminal, consigo processar um ou mais clipes sempre que necessário, sem depender de automações ou scripts.

### O Resultado

Depois de aplicar o FFmpeg nos 26 clipes:

> **Tamanho original:** **6,99 GB (7.507.008.672 bytes)** **Tamanho compactado:** **1,05 GB (1.135.170.065 bytes)**

A economia de espaço foi enorme — **redução de mais de 85%** — e os vídeos continuam ótimos para rever ou compartilhar.

## Como funciona?

O processo de compressão com este projeto é simples e interativo:

1.  **Configure o destino dos arquivos compactados** No arquivo `config.ts`, defina o caminho da pasta onde os vídeos compactados serão salvos.
    
2.  **Inicie o programa** Ao executar o programa, ele vai solicitar o caminho onde estão os arquivos a serem compactados:
    
3.  **Escolha como deseja comprimir os arquivos** O programa perguntará se você quer compactar todos os vídeos da pasta ou escolher apenas um:
    
    ##### Opções:
    
    -   Compactar todos
    -   Selecionar um
4.  **Compactação em andamento** Após sua escolha, o programa inicia a compressão com base nas configurações, utilizando o FFmpeg para gerar os vídeos compactados no diretório configurado.
    

----------

# English (EN)

## FFmpeg

FFmpeg is a command-line tool for processing videos and audio. With it, you can efficiently convert formats, extract audio, edit videos, and compress media files. One of FFmpeg's most common uses is reducing video size while maintaining good quality.

##### Basic example:

Bash

```
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 output.mp4
```

Attribute explanation:

-   `ffmpeg`: Calls the FFmpeg tool from the command line.
-   `-i input.mp4`: Indicates the **input** file (`input.mp4`). `-i` stands for "input."
-   `-vcodec libx264`: Defines the **video codec** to be used in the output. `libx264` is the H.264 codec (one of the most efficient for compression with good quality).
-   `-crf 23`: Defines the **Constant Rate Factor** (CRF). This value controls the **video quality**:
    -   The **lower** the number, the **higher** the quality and file size.
    -   The **higher** the number, the **lower** the quality and size.
    -   Common values range from 18 (high quality) to 28 (stronger compression).
-   `output.mp4`: Defines the name of the compressed **output file**.

You can download FFmpeg directly from the official website: 👉 [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

## Project Motivation

NVIDIA offers a very useful feature for gamers: instant game clip recording. With it, you can save the last seconds or minutes of gameplay — in my case, I configured it to save 1 minute and 30 seconds.

This feature is excellent for capturing cool plays or funny moments during a match. However, even with this short duration, the generated files have **very high quality**, resulting in disproportionately large video sizes: **some 1:30min clips exceed 500MB**.

### The Problem

Keeping many of these clips quickly takes up a lot of disk space. For example, a folder containing **26 Overwatch 2 game clips** totaled:

> **6.99 GB (7,507,008,672 bytes)**

This makes managing and storing these videos unfeasible over time, especially on SSDs with limited space.

### The Solution

My solution was to use **FFmpeg manually** to compress the videos, drastically reducing file size while maintaining satisfactory visual quality. With simple terminal commands, I can process one or more clips whenever needed, without relying on automations or scripts.

### The Result

After applying FFmpeg to the 26 clips:

> **Original size:** **6.99 GB (7,507,008,672 bytes)** **Compressed size:** **1.05 GB (1,135,170,065 bytes)**

The space saving was enormous — **more than 85% reduction** — and the videos still look great for reviewing or sharing.

## How it Works

The compression process with this project is simple and interactive:

1.  **Configure the destination for compressed files** In the `config.ts` file, define the path to the folder where the compressed videos will be saved.
    
2.  **Start the program** When you run the program, it will ask for the path where the files to be compressed are located:
    
3.  **Choose how you want to compress the files** The program will ask if you want to compress all videos in the folder or choose just one:
    
    ##### Options:
    
    -   Compress all
    -   Select one
4.  **Compression in progress** After your choice, the program starts the compression based on the configurations, using FFmpeg to generate the compressed videos in the configured directory.
---