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
  descrizione: string;
  premiogruppo: boolean;
  solodiamante: boolean;
  comeottenerla: string;

  constructor(nome?: string) {
    this.nome = nome;
    this.premiogruppo = false;
    this.solodiamante = false;
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
  }

  get isArgento(): boolean {
    return this.categoria === CategoriaEmoji.ARGENTO;
  }

  get isOro(): boolean {
    return this.categoria === CategoriaEmoji.ORO;
  }

}
