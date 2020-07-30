import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji, CategoriaEmoji } from '../../../../../model/emoji.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmojiComponent } from '../edit-emoji/edit-emoji.component';
import { ICONS } from 'src/app/icons/icons';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { EmojiViewComponent } from '../emoji-view/emoji-view.component';


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


  get emojiArgento(): Emoji[] {
    return this.emoji.filter(e => e.isArgento).sort((a, b) => a.ordine >= b.ordine ? 1 : -1);
  }

  get emojiOro(): Emoji[] {
    return this.emoji.filter(e => e.isOro).sort((a, b) => a.ordine >= b.ordine ? 1 : -1);
  }

  get emojiArgentoColumns(): number {
    const floor = Math.floor(this.emojiArgento.length / 3);
    const notfloor = this.emojiArgento.length / 3;

    return (floor === notfloor) ? floor : floor + 1;
  }

  get emojiOroColumns(): number {
    const floor = Math.floor(this.emojiOro.length / 3);
    const notfloor = this.emojiOro.length / 3;

    return (floor === notfloor) ? floor : floor + 1;
  }


  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  selectEmoji(emoji: Emoji): void {
    const modal = this.modalService.open(EmojiViewComponent, { centered: true, size: 'lg' });
    modal.componentInstance.emoji = emoji;
    this.selezionata = emoji;
  }
  aggiungi(): void {
    const modal = this.modalService.open(EditEmojiComponent, { centered: true, size: 'lg' });

  }

}
