import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji, CategoriaEmoji, SerieEmoji, StatisticheEmoji } from '../../../../../model/emoji.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmojiComponent } from '../edit-emoji/edit-emoji.component';
import { ICONS } from 'src/app/icons/icons';
import { EmojiViewComponent } from '../emoji-view/emoji-view.component';
import { scatole } from '../../../../icons/scatole';
import { EmojiService } from '../../../../../service/emoji.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss']
})
export class EmojiListComponent implements OnInit {

  @Input()
  emoji: Emoji[];
  emojiArgento: Emoji[];
  emojiOro: Emoji[];
  emojiStoria: Emoji[];
  emojiArcobaleno: Emoji[];
  emojiCattivo: Emoji[];
  emojiSerieI: Emoji[];
  emojiSerieII: Emoji[];
  emojiSerieIII: Emoji[];

  @Output()
  selected = new EventEmitter();
  selezionata: Emoji;

  smile = ICONS.smile;
  diamond = ICONS.diamond;
  lock = ICONS.lock;
  check = ICONS.check;

  scatole = scatole;
  scatola = 'argento';
  ordinaemoji = false;

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
    this.emojiArgento = this.emojiService.prendiEmojyByCat(CategoriaEmoji.ARGENTO);
    this.emojiOro = this.emojiService.prendiEmojyByCat(CategoriaEmoji.ORO);
    this.emojiStoria = this.emojiService.prendiEmojyByCat(CategoriaEmoji.STORIA);
    this.emojiArcobaleno = this.emojiService.prendiEmojyByCat(CategoriaEmoji.ARCOBALENO);
    this.emojiCattivo = this.emojiService.prendiEmojyByCat(CategoriaEmoji.CATTIVO);
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
    this.statistiche.argento.categoria = CategoriaEmoji.ARGENTO;
    this.statistiche.argento.totali = this.emojiArgento.length;
    this.statistiche.argento.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.ARGENTO);
  }

  statisticheOro() {
    this.statistiche.oro.categoria = CategoriaEmoji.ORO;
    this.statistiche.oro.totali = this.emojiOro.length;
    this.statistiche.oro.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.ORO);
  }

  statisticheSerieI() {
    this.statistiche.seriei.serie = SerieEmoji.I;
    this.statistiche.seriei.totali = this.emojiSerieI.length;
    this.statistiche.seriei.mancanti = this.emojiSerieI.filter(e => e.count === 0).length;
  }

  statisticheSerieII() {
    this.statistiche.serieii.serie = SerieEmoji.II;
    this.statistiche.serieii.totali = this.emojiSerieII.length;
    this.statistiche.serieii.mancanti = this.emojiSerieII.filter(e => e.count === 0).length;
  }

  statisticheSerieIII() {
    this.statistiche.serieiii.serie = SerieEmoji.III;
    this.statistiche.serieiii.totali = this.emojiSerieIII.length;
    this.statistiche.serieiii.mancanti = this.emojiSerieIII.filter(e => e.count === 0).length;
  }

  selectEmoji(emoji: Emoji): void {
    const modal = this.modalService.open(EmojiViewComponent, { centered: true, size: 'lg' });
    modal.componentInstance.emoji = emoji;
    this.selezionata = emoji;

  }

  statisticheStoria() {
    this.statistiche.storia.categoria = CategoriaEmoji.STORIA;
    this.statistiche.storia.totali = this.emojiStoria.length;
    this.statistiche.storia.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.STORIA);
  }

  statisticheArcobaleno() {
    this.statistiche.arcobaleno.categoria = CategoriaEmoji.ARCOBALENO;
    this.statistiche.arcobaleno.totali = this.emojiArcobaleno.length;
    this.statistiche.arcobaleno.mancanti = this.emojiService.contaEmoji('count', 0, CategoriaEmoji.ARCOBALENO);
  }

  statisticheCattivo() {
    this.statistiche.cattivo.categoria = CategoriaEmoji.CATTIVO;
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

  drop(event: CdkDragDrop<string[]>, listaEmoji: Emoji[]): void {
    moveItemInArray(listaEmoji, event.previousIndex, event.currentIndex);

  }

  salvaOrdine(): void {
    let listaEmoji: Emoji[];
    switch (this.scatola) {
      case 'argento':
        listaEmoji = this.emojiArgento;
        break;
      case 'oro':
        listaEmoji = this.emojiOro;
        break;
    }

    const t = listaEmoji.length;
    this.salvaprogressi = true;
    for (let e = 0; e < t; e++) {
      const emoji = listaEmoji[e];
      emoji.ordine = e + 1;
      emoji.update();
      this.emojiService.modificaEmoji(emoji);
      console.log(Math.floor(e / t * 100) + '%');

    }


    this.ordinaemoji = false;
  }

}
