export enum CategoriaEmoji {
  ARGENTO = 'argento',
  ORO = 'oro',
  STORIA = 'storia',
  ARCOBALENO = 'arcobaleno',
  CATTIVO = 'cattivo'
}

export enum SerieEmoji {
  I = 'I',
  II = 'II',
  III = 'III'
}

export class Emoji {
  id: number;
  nome: string;
  categoria: CategoriaEmoji;
  livello: number;
  punti: number;
  count: number;
  serie: SerieEmoji;
  immagine: string;
  ordine: number;

  constructor(nome?: string) {
    this.nome = nome;
  }



  get livelloMassimo(): boolean {
    if (this.categoria === CategoriaEmoji.ARGENTO && this.livello === 3) {
      return true;
    }

    return this.livello === 5;
  }

  get countMassimo(): number {
    switch (this.categoria) {
      case CategoriaEmoji.ARGENTO:
        return 8;
      case CategoriaEmoji.ORO:
        return 19;
      case CategoriaEmoji.CATTIVO:
        return 18;
      default:
        return undefined;
    }
    if (this.categoria === CategoriaEmoji.ARGENTO) {
      return 8;
    }
  }
}
