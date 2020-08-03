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
      case CategoriaEmoji.STORIA:
        if (this.nome === 'Spirito di Mufasa') { return 1; }
        if (this.nome === 'Rapunzel con diadema') { return 2; }

      case CategoriaEmoji.ARCOBALENO:
        if (this.nome === 'Topolino natalizio') { return 2; }

      default:
        return 1;
    }
  }

  get isArgento(): boolean {
    return this.categoria === CategoriaEmoji.ARGENTO;
  }

  get isOro(): boolean {
    return this.categoria === CategoriaEmoji.ORO;
  }

  get isStoria(): boolean {
    return this.categoria === CategoriaEmoji.STORIA;
  }

  get isArcobaleno(): boolean {
    return this.categoria === CategoriaEmoji.ARCOBALENO;
  }


  get imagebig(): boolean {
    const images = [];
    images.push('Lumière');

    return images.find(e => e === this.nome);
  }

  get imagemedium(): boolean {
    const images = [];
    images.push('Judy Hoops');
    images.push('Olaf');
    images.push('Cri-Cri');
    images.push('Paura');
    images.push('Maximus');
    return images.find(e => e === this.nome);
  }

  get imagesmall(): boolean {
    const images = [];
    images.push('Brontolo');
    images.push('Pacha');
    images.push('Duke Caboom');
    images.push('Flit');
    images.push('Alieno');
    images.push('Ray');
    images.push('Principe Azzurro');
    images.push('HeiHei');
    images.push('Louis');
    images.push('Meeko');
    images.push('Finnick');
    images.push('Flash');
    images.push('Calhoun');
    images.push('Bo Peep');
    images.push('Forky');
    return images.find(e => e === this.nome);
  }

  get completa(): boolean {
    return this.count === this.countMassimo;
  }

}
