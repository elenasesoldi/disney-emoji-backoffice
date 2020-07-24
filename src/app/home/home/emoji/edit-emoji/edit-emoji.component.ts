import { Component, OnInit } from '@angular/core';
import { Emoji } from 'src/model/emoji.model';
import { EmojiService } from '../../../../../service/emoji.service';
import { CategoriaEmoji, SerieEmoji } from '../../../../../model/emoji.model';

@Component({
  selector: 'app-edit-emoji',
  templateUrl: './edit-emoji.component.html',
  styleUrls: ['./edit-emoji.component.scss']
})
export class EditEmojiComponent implements OnInit {

  emoji: Emoji = new Emoji();

  categorie = Object.keys(CategoriaEmoji).map(c => CategoriaEmoji[c]);
  serie = Object.keys(SerieEmoji).map(s => SerieEmoji[s]);

  constructor(
    private emojiService: EmojiService
  ) { }

  ngOnInit() {
  }

  caricaEmoji(id: number): void {
    this.emoji = this.emojiService.prendi(id);
  }

  annulla(): void { }

  salva(): void {
    console.log(this.emoji);
  }

}
