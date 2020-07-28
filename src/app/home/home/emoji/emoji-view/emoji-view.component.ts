import { Component, OnInit, Input } from '@angular/core';
import { Emoji } from '../../../../../model/emoji.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmojiComponent } from '../edit-emoji/edit-emoji.component';
import { EmojiService } from '../../../../../service/emoji.service';
import { ICONS } from '../../../../icons/icons';

@Component({
  selector: 'app-emoji-view',
  templateUrl: './emoji-view.component.html',
  styleUrls: ['./emoji-view.component.scss']
})
export class EmojiViewComponent implements OnInit {

  @Input()
  emoji: Emoji;

  smile = ICONS.smile;
  diamond = ICONS.diamond;

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  modifica(): void {
    const modal = this.modalService.open(EditEmojiComponent, { centered: true, size: 'lg' });
    modal.componentInstance.caricaEmoji(this.emoji.id);

  }

  elimina(): void {
  }

  annulla(): void {
    this.activeModal.dismiss();
  }

}
