import { Component, OnInit, Input } from '@angular/core';
import { Emoji } from '../../../../../model/emoji.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmojiComponent } from '../edit-emoji/edit-emoji.component';
import { EmojiService } from '../../../../../service/emoji.service';
import { ICONS } from '../../../../icons/icons';
import { GruppoService } from '../../../../../service/gruppo.service';
import { Gruppo } from '../../../../../model/gruppo.model';

@Component({
  selector: 'app-emoji-view',
  templateUrl: './emoji-view.component.html',
  styleUrls: ['./emoji-view.component.scss']
})
export class EmojiViewComponent implements OnInit {

  @Input()
  emoji: Emoji;

  gruppi: Gruppo[] = [];

  smile = ICONS.smile;
  diamond = ICONS.diamond;
  lock = ICONS.lock;

  constructor(
    private emojiService: EmojiService,
    private gruppoService: GruppoService,
    private modalService: NgbModal) { }

  ngOnInit() {
    for (const g of this.emoji.gruppi) {
      const gruppo = this.gruppoService.prendi(g);
      this.gruppi.push(gruppo);
    }
  }

  modifica(): void {
    const modal = this.modalService.open(EditEmojiComponent, { centered: true, size: 'lg' });
    modal.componentInstance.caricaEmoji(this.emoji.id);

  }

  elimina(): void {
    this.emojiService.elimina(this.emoji.id);
    this.modalService.dismissAll();
  }

  annulla(): void {
    this.modalService.dismissAll();
  }

}
