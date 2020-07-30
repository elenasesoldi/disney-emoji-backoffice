import { Base } from './base.model';
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

export class Emoji extends Base {

  nome: string;
  categoria: CategoriaEmoji;
  livello: number;
  punti: number;
  count: number;
  serie: SerieEmoji;
  immagine: string;
  descrizione: string;
  premiogruppo: boolean;
  solodiamante: boolean;
  comeottenerla: string;

  constructor(nome?: string) {
    super();
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

  get imagebig(): boolean {
    return this.nome === 'Lumière';
  }

  get imagemedium(): boolean {
    return this.nome === 'Judy Hoops' || this.nome === 'Olaf' || this.nome === 'Cri-Cri' || this.nome === 'Paura';
  }

}
