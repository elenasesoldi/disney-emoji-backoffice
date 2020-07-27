import { Component, OnInit } from '@angular/core';
import { EmojiService } from '../../../service/emoji.service';
import { Emoji } from '../../../model/emoji.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  emoji: Emoji[];
  selectedEmoji: Emoji;

  constructor(private emojiService: EmojiService) { }

  ngOnInit() {
    this.emojiService.emoji.subscribe((data: Emoji[]) => {
      this.emoji = data;
    });
  }

  selectEmoji(emoji: Emoji): void {
    this.selectedEmoji = emoji;
  }

}
