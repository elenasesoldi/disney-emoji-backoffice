import { Component, OnInit, Input } from '@angular/core';
import { Gruppo, EmojiGruppo } from '../../../../model/gruppo.model';
import { Emoji } from '../../../../model/emoji.model';
import { EmojiService } from 'src/service/emoji.service';
import { ICONS } from '../../../icons/icons';
import { GruppoService } from '../../../../service/gruppo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmojiComponent } from './add-emoji/add-emoji.component';

@Component({
  selector: 'app-gruppo-view',
  templateUrl: './gruppo-view.component.html',
  styleUrls: ['./gruppo-view.component.scss']
})
export class GruppoViewComponent implements OnInit {

  @Input()
  gruppo: Gruppo;
  emojiGruppo: EmojiGruppo[];

  emojipremio: Emoji;
  plus = ICONS.plus;

  constructor(
    private emojiService: EmojiService,
    private gruppoService: GruppoService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    const id = this.gruppo.emojipremio ? this.gruppo.emojipremio : 1;
    this.emojipremio = this.emojiService.prendi(+id);
    this.emojiGruppo = this.gruppoService.prendiEmoji(+id);
  }

  aggiungiEmoji(): void {
    const modal = this.modalService.open(AddEmojiComponent, { size: 'md' });
    modal.componentInstance.gruppo = this.gruppo;
    modal.componentInstance.emojiGruppo = this.emojiGruppo;
  }



}
