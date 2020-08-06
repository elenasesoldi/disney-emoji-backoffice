import { Component, OnInit } from '@angular/core';
import { Gruppo } from 'src/model/gruppo.model';
import { GruppoService } from '../../../service/gruppo.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Emoji } from 'src/model/emoji.model';
import { EmojiService } from 'src/service/emoji.service';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-gruppi-edit',
  templateUrl: './gruppi-edit.component.html',
  styleUrls: ['./gruppi-edit.component.scss']
})
export class GruppiEditComponent implements OnInit {

  gruppo: Gruppo = new Gruppo();
  emoji: Emoji[];

  get titolo(): string {
    return this.gruppo?.id ? 'Modifica Gruppo' : 'Nuovo Gruppo';
  }

  constructor(
    private gruppoService: GruppoService,
    private activeModal: NgbActiveModal,
    private emojiService: EmojiService
  ) { }

  ngOnInit() {
    this.emojiService.emoji.subscribe((data: Emoji[]) => {
      this.emoji = data.filter(el => el.premiogruppo);
      console.log(this.emoji);
    });
  }

  caricaGruppo(id: number): void {
    this.gruppo = this.gruppoService.prendi(id);
  }

  annulla(): void {
    this.activeModal.dismiss();
  }

  salva(): void {
    this.gruppo = plainToClass(Gruppo, this.gruppo);
    this.gruppo.update();
    if (!this.gruppo.id) {
      this.gruppo.id = this.gruppoService.gruppiTotali + 1;
      this.gruppo.ordine = this.gruppoService.gruppiTotali + 1;

      this.gruppoService.aggiungiGruppo(this.gruppo);
    } else {
      this.gruppoService.modificaGruppo(this.gruppo);
    }
    this.activeModal.dismiss();
  }

}
