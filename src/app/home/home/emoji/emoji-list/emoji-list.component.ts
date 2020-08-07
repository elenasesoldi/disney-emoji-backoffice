import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji, CategoriaEmoji, SerieEmoji, StatisticheEmoji } from '../../../../../model/emoji.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmojiComponent } from '../edit-emoji/edit-emoji.component';
import { ICONS } from 'src/app/icons/icons';
import { EmojiViewComponent } from '../emoji-view/emoji-view.component';
import { scatole } from '../../../../icons/scatole';
import { EmojiService } from '../../../../../service/emoji.service';


@Component({
  selector: 'app-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss']
})
export class EmojiListComponent implements OnInit {

  @Input()
  emoji: Emoji[];

  @Output()
  selected = new EventEmitter();
  selezionata: Emoji;

  smile = ICONS.smile;
  diamond = ICONS.diamond;
  lock = ICONS.lock;
  check = ICONS.check;

  scatole = scatole;
  scatola = 'argento';


  get emojiArgento(): Emoji[] {
    return this.emoji.filter(e => e.isArgento).sort((a, b) => a.ordine >= b.ordine ? 1 : -1);
  }

  get emojiOro(): Emoji[] {
    return this.emoji.filter(e => e.isOro).sort((a, b) => a.ordine >= b.ordine ? 1 : -1);
  }

  get emojiStoria(): Emoji[] {
    return this.emoji.filter(e => e.isStoria).sort((a, b) => a.ordine >= b.ordine ? 1 : -1);
  }

  get emojiArcobaleno(): Emoji[] {
    return this.emoji.filter(e => e.isArcobaleno).sort((a, b) => a.ordine >= b.ordine ? 1 : -1);
  }

  get emojiCattivo(): Emoji[] {
    return this.emoji.filter(e => e.isCattivo).sort((a, b) => a.ordine >= b.ordine ? 1 : -1);
  }

  emojiSerieI: Emoji[];
  emojiSerieII: Emoji[];
  emojiSerieIII: Emoji[];

  statistiche = {
    argento: new StatisticheEmoji(),
    oro: new StatisticheEmoji(),
    seriei: new StatisticheEmoji(),
    serieii: new StatisticheEmoji(),
    serieiii: new StatisticheEmoji(),
    storia: new StatisticheEmoji(),
    arcobaleno: new StatisticheEmoji(),
    cattivo: new StatisticheEmoji()
  };

  constructor(private modalService: NgbModal, private emojiService: EmojiService) { }

  ngOnInit() {
    this.emojiSerieI = this.emojiService.prendiEmoji('serie', SerieEmoji.I);
    this.emojiSerieII = this.emojiService.prendiEmoji('serie', SerieEmoji.II);
    this.emojiSerieIII = this.emojiService.prendiEmoji('serie', SerieEmoji.III);

    this.statisticheArgento();
    this.statisticheOro();
    this.statisticheSerieI();
    this.statisticheSerieII();
    this.statisticheSerieIII();
    this.statisticheStoria();
    this.statisticheArcobaleno();
    this.statisticheCattivo();


  }

  statisticheArgento() {
    this.statistiche.argento.totali = this.emojiArgento.length;
    this.statistiche.argento.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.ARGENTO);
  }

  statisticheOro() {
    this.statistiche.oro.totali = this.emojiOro.length;
    this.statistiche.oro.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.ORO);
  }

  statisticheSerieI() {
    this.statistiche.seriei.totali = this.emojiSerieI.length;
    this.statistiche.seriei.mancanti = this.emojiSerieI.filter(e => e.count === 0).length;
  }

  statisticheSerieII() {
    this.statistiche.serieii.totali = this.emojiSerieII.length;
    this.statistiche.serieii.mancanti = this.emojiSerieII.filter(e => e.count === 0).length;
  }

  statisticheSerieIII() {
    this.statistiche.serieiii.totali = this.emojiSerieIII.length;
    this.statistiche.serieiii.mancanti = this.emojiSerieIII.filter(e => e.count === 0).length;
  }

  selectEmoji(emoji: Emoji): void {
    const modal = this.modalService.open(EmojiViewComponent, { centered: true, size: 'lg' });
    modal.componentInstance.emoji = emoji;
    this.selezionata = emoji;

  }

  statisticheStoria() {
    this.statistiche.storia.totali = this.emojiStoria.length;
    this.statistiche.storia.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.STORIA);
  }

  statisticheArcobaleno() {
    this.statistiche.arcobaleno.totali = this.emojiArcobaleno.length;
    this.statistiche.arcobaleno.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.ARCOBALENO);
  }

  statisticheCattivo() {
    this.statistiche.cattivo.totali = this.emojiCattivo.length;
    this.statistiche.cattivo.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.CATTIVO);
  }

  aggiungi(): void {
    const modal = this.modalService.open(EditEmojiComponent, { centered: true, size: 'lg' });
    if (this.scatola.indexOf('serie') < 0) {
      modal.componentInstance.emoji.categoria = this.scatola;
    } else {
      modal.componentInstance.emoji.categoria = CategoriaEmoji.ORO;
      modal.componentInstance.emoji.serie = this.scatola.split('serie')[1];
    }
  }

}
