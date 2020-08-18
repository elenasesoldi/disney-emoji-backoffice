import { Base } from './base.model';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Gruppo, EmojiGruppo } from './gruppo.model';
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
        return 19;

      case CategoriaEmoji.ARCOBALENO:

        const max1 = ['Yen Sid'];
        const max3 = ['Fata madrina', 'Fatina blu', 'Incantatrice'];
        const max5 = ['Siberius', 'Nonna Tala'];
        if (max1.find(n => n === this.nome)) {
          return 1;
        }
        if (max3.find(n => n === this.nome)) {
          return 3;
        }
        if (max5.find(n => n === this.nome)) {
          return 5;
        }

        return 19;
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

  get isCattivo(): boolean {
    return this.categoria === CategoriaEmoji.CATTIVO;
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
    images.push('Ade');
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

  get punteggio(): number {
    return this.punti ? this.punti : 0;
  }

  get LIVELLO(): number {
    return this.livello ? this.livello : 0;
  }




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
  static keys() {
    return ['ordine', 'nome', 'LIVELLO', 'punteggio', 'count'];
  }

  get gruppi(): number[] {
    const g = JSON.parse(localStorage.getItem('emojigruppi'));
    const res = [];
    if (g) {
      const gruppi: EmojiGruppo[] = g.map(r => plainToClass(EmojiGruppo, r));
      for (const gruppo of gruppi) {
        if (gruppo.emojiid === this.id) {
          res.push(gruppo.gruppoid);
        }
      }

      return res;
    }


  }
}

export class StatisticheEmoji {
  categoria: CategoriaEmoji;
  serie: SerieEmoji;
  totali: number;
  mancanti: number;

  get ottenute(): number {
    return this.totali - this.mancanti;
  }

}
