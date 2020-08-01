import { Component, OnInit } from '@angular/core';
import { Gruppo, EmojiGruppo } from '../../../../../model/gruppo.model';
import { GruppoService } from '../../../../../service/gruppo.service';
import { EmojiService } from '../../../../../service/emoji.service';
import { Emoji } from 'src/model/emoji.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-emoji',
  templateUrl: './add-emoji.component.html',
  styleUrls: ['./add-emoji.component.scss']
})
export class AddEmojiComponent implements OnInit {

  gruppo: Gruppo;
  emojiGruppo: EmojiGruppo[];

  filtertext: string;
  allemoji: Emoji[];
  filteremoji: Emoji[];

  constructor(
    private gruppoService: GruppoService,
    private emojiService: EmojiService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log(this.gruppo);
    console.log(this.emojiGruppo);

    this.emojiService.emoji.subscribe((data: Emoji[]) => {
      this.allemoji = data;
    });
  }

  annulla(): void {
    this.modalService.dismissAll();
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();

    if (val) {

      this.filteremoji = this.allemoji.filter(e => {
        return e.nome?.toLowerCase().indexOf(val) === 0;
      });


    } else {
      this.filteremoji = [];
    }
  }

  aggiungiEmoji(emoji: Emoji): void {
    this.gruppoService.aggiungiEmojiGruppo(+this.gruppo.id, +emoji.id);
    this.modalService.dismissAll();
  }

}
