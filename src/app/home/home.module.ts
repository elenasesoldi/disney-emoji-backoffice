import { HomeComponent } from './home/home.component';
import { EditEmojiComponent } from './home/emoji/edit-emoji/edit-emoji.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmojiViewComponent } from './home/emoji/emoji-view/emoji-view.component';
import { EmojiListComponent } from './home/emoji/emoji-list/emoji-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared/shared.module';

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
    NgbModalModule,
    FontAwesomeModule,
    ScrollingModule,
    SharedModule,
    NgbTooltipModule
  ]
})
export class HomeModule { }
