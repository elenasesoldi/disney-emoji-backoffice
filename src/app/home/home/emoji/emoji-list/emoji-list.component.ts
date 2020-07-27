import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji, CategoriaEmoji } from '../../../../../model/emoji.model';


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


  get emojiArgento(): Emoji[] {
    return this.emoji.filter(e => e.categoria === CategoriaEmoji.ARGENTO);
  }

  get emojiArgentoColumns(): number {
    const floor = Math.floor(this.emoji.length / 3);
    const notfloor = this.emoji.length / 3;

    return (floor === notfloor) ? floor : floor + 1;
  }

  constructor() { }

  ngOnInit() {
  }

  selectEmoji(emoji: Emoji): void {
    this.selected.emit(emoji);
  }

}
