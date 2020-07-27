import { HomeComponent } from './home/home.component';
import { EditEmojiComponent } from './home/emoji/edit-emoji/edit-emoji.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EmojiViewComponent } from './home/emoji/emoji-view/emoji-view.component';
import { EmojiListComponent } from './home/emoji/emoji-list/emoji-list.component';

@NgModule({
  declarations: [
    EditEmojiComponent,
    EmojiListComponent,
    EmojiViewComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgbModalModule
  ]
})
export class HomeModule { }
