import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji, CategoriaEmoji } from '../../../../../model/emoji.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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


  get emojiArgento(): Emoji[] {
    return this.emoji.filter(e => e.categoria === CategoriaEmoji.ARGENTO);
  }

  get emojiArgentoColumns(): number {
    const floor = Math.floor(this.emoji.length / 3);
    const notfloor = this.emoji.length / 3;

    return (floor === notfloor) ? floor : floor + 1;
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

    console.log(this.emojiArgentoColumns);
  }

  selectEmoji(emoji: Emoji): void {
    const modal = this.modalService.open(EmojiViewComponent, { centered: true, size: 'lg' });
    modal.componentInstance.emoji = emoji;
    this.selezionata = emoji;
  }
  aggiungi(): void {
    const modal = this.modalService.open(EditEmojiComponent, { centered: true, size: 'lg' });

  }

}
