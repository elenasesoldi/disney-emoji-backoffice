import { CategoriaEmoji } from '../../model/emoji.model';

const ARGENTO = 'https://vignette.wikia.nocookie.net/disney/images/c/c9/Emoji_Blitz_Silver_Box.png';
const ORO = 'https://vignette.wikia.nocookie.net/disney/images/6/69/Emoji_Blitz_Gold_Box.png';
const SERIE_I = 'https://vignette.wikia.nocookie.net/disney/images/9/9d/Emoji_Blitz_Series_I_Box.png';
const SERIE_II = 'https://vignette.wikia.nocookie.net/disney/images/e/ea/Emoji_Blitz_Series_II_Box.png';
const SERIE_III = 'https://vignette.wikia.nocookie.net/disney/images/0/0b/Emoji_Blitz_Series_III_Box.png';
const STORIA = '';
const ARCOBALENO = 'https://vignette.wikia.nocookie.net/disney/images/0/0a/Emoji_Blitz_Rainbow_Box.png';
const CATTIVO = 'https://vignette.wikia.nocookie.net/disney/images/8/8e/Emoji_Blitz_Villain_Box.png';


export class Scatola {
  immagine: string;
  nome: string;

  constructor(n: string, i: string) {
    this.nome = n;
    this.immagine = i;
  }
}

export const scatole: Scatola[] = [];
scatole.push(new Scatola(CategoriaEmoji.ARGENTO, ARGENTO));
scatole.push(new Scatola(CategoriaEmoji.ORO, ORO));
scatole.push(new Scatola('serieI', SERIE_I));
scatole.push(new Scatola('serieII', SERIE_II));
scatole.push(new Scatola('serieIII', SERIE_III));
scatole.push(new Scatola(CategoriaEmoji.STORIA, STORIA));
scatole.push(new Scatola(CategoriaEmoji.ARCOBALENO, ARCOBALENO));
scatole.push(new Scatola(CategoriaEmoji.CATTIVO, CATTIVO));
