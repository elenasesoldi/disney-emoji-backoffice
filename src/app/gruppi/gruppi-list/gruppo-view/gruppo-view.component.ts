import { Component, OnInit, Input } from '@angular/core';
import { Gruppo } from '../../../../model/gruppo.model';
import { Emoji } from '../../../../model/emoji.model';
import { EmojiService } from 'src/service/emoji.service';

@Component({
  selector: 'app-gruppo-view',
  templateUrl: './gruppo-view.component.html',
  styleUrls: ['./gruppo-view.component.scss']
})
export class GruppoViewComponent implements OnInit {

  @Input()
  gruppo: Gruppo;

  emojipremio: Emoji;

  constructor(
    private emojiService: EmojiService
  ) { }

  ngOnInit() {

    const id = this.gruppo.emojipremio ? this.gruppo.emojipremio : 1;
    this.emojipremio = this.emojiService.prendi(+id);
  }

}
