import { Base } from './base.model';
import { Emoji } from './emoji.model';
export class Gruppo extends Base {
  nome: number;
  emojipremio: number;
  immagine: string;
}

export class EmojiGruppo extends Base {
  gruppoid: number;
  emojiid: number;
  emoji?: Emoji;

  constructor(gruppoid?: number, emojiid?: number) {
    super();
    this.gruppoid = gruppoid;
    this.emojiid = emojiid;
  }
}
