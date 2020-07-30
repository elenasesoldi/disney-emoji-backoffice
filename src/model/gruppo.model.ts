import { Base } from './base.model';
export class Gruppo extends Base {
  nome: number;
  emojipremio: number;
  immagine: string;
}

export class EmojiGruppo extends Base {
  gruppoid: number;
  emojiid: number;
}
