import { Component, OnInit } from '@angular/core';
import { Emoji } from 'src/model/emoji.model';
import { EmojiService } from '../../../../../service/emoji.service';
import { CategoriaEmoji, SerieEmoji } from '../../../../../model/emoji.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-emoji',
  templateUrl: './edit-emoji.component.html',
  styleUrls: ['./edit-emoji.component.scss']
})
export class EditEmojiComponent implements OnInit {

  emoji: Emoji = new Emoji();

  categorie = Object.keys(CategoriaEmoji).map(c => CategoriaEmoji[c]);
  serieemoji = Object.keys(SerieEmoji);

  get titolo(): string {
    return this.emoji?.id ? 'Modifica Emoji' : 'Nuova Emoji';
  }

  constructor(
    private emojiService: EmojiService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  caricaEmoji(id: number): void {
    this.emoji = this.emojiService.prendi(id);
  }

  annulla(): void {
    this.activeModal.dismiss();
  }

  salva(): void {
    if (!this.emoji.id) {
      this.emoji.id = this.emojiService.emojiTotali + 1;
      this.emoji.ordine = this.emojiService.emojiTotali + 1;

      this.emojiService.aggiungiEmoji(this.emoji);
    } else {
      this.emojiService.modificaEmoji(this.emoji);
    }
    this.activeModal.dismiss();
  }


}
