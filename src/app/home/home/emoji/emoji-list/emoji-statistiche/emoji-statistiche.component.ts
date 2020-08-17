import { Component, OnInit, Input } from '@angular/core';
import { StatisticheEmoji, Emoji } from '../../../../../../model/emoji.model';
import { EmojiService } from '../../../../../../service/emoji.service';
import { ThrowStmt } from '@angular/compiler';
import { ICONS } from '../../../../../icons/icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmojiViewComponent } from '../../emoji-view/emoji-view.component';

@Component({
  selector: 'app-emoji-statistiche',
  templateUrl: './emoji-statistiche.component.html',
  styleUrls: ['./emoji-statistiche.component.scss']
})
export class EmojiStatisticheComponent implements OnInit {

  @Input()
  statistiche: StatisticheEmoji;

  emoji: Emoji[];
  progresso = 0;
  totale = 0;
  punteggiomedio = 0;
  punteggiomassimo = 0;
  punteggiominimo = Number.MAX_SAFE_INTEGER;

  // tabelle
  livelli = {};
  count = {};
  punti = {};
  Object = Object;
  tabellacompleta = false;
  mostra = ICONS.mostra;
  nascondi = ICONS.nascondi;

  get perc(): number {
    return this.progresso / this.totale * 100;
  }

  get medialivelli(): number {
    let m = 0;
    for (const l of Object.keys(this.livelli)) {
      m += +l * this.livelli[l].length;
    }

    return m / this.statistiche.totali;
  }

  get mediacount(): number {
    let m = 0;
    for (const l of Object.keys(this.count)) {
      m += +l * this.count[l].length;
    }

    return m / this.statistiche.totali;
  }

  get mediapunti(): number {
    let m = 0;
    for (const l of Object.keys(this.punti)) {
      m += +l * this.punti[l].length;
    }

    return m / this.statistiche.totali;
  }



  constructor(
    private emojiService: EmojiService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    if (this.statistiche.categoria) {
      this.emoji = this.emojiService.prendiEmojyByCat(this.statistiche.categoria);
    }
    if (this.statistiche.serie) {
      this.emoji = this.emojiService.prendiEmoji('serie', this.statistiche.serie);
    }


    for (const e of this.emoji) {
      this.progresso += e.count;
      this.totale += e.countMassimo;
      this.punteggiomedio += e.punteggio;
      this.punteggiomassimo = (e.punteggio > this.punteggiomassimo) ? e.punteggio : this.punteggiomassimo;
      this.punteggiominimo = (e.punti && e.punti < this.punteggiominimo) ? e.punti : this.punteggiominimo;
    }

    this.punteggiomedio /= this.statistiche.ottenute;
    this.creaLivelli();
    this.creaCount();
    this.creaPunti();

  }

  creaLivelli(): void {
    for (const e of this.emoji) {
      const l = e.livello ? e.livello : 0;
      if (this.livelli[l]) {
        this.livelli[l].push(e);
      } else {
        this.livelli[l] = [e];
      }
    }

  }

  creaCount(): void {
    for (const e of this.emoji) {
      if (this.count[e.count]) {
        this.count[e.count].push(e);
      } else {
        this.count[e.count] = [e];
      }
    }
  }

  creaPunti(): void {
    for (const e of this.emoji) {
      const p = e.punteggio - e.punteggio % 100;
      if (this.punti[p]) {
        this.punti[p].push(e);
      } else {
        this.punti[p] = [e];
      }
    }
  }

  selectEmoji(emoji: Emoji): void {
    console.log(emoji);
    const modal = this.modalService.open(EmojiViewComponent, { centered: true, size: 'lg' });
    modal.componentInstance.emoji = emoji;

  }

}
