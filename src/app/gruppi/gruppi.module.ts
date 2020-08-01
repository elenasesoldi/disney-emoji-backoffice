import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GruppiRoutingModule } from './gruppi-routing.module';
import { GruppiComponent } from './gruppi.component';
import { GruppiListComponent } from './gruppi-list/gruppi-list.component';
import { SharedModule } from '../shared/shared.module';
import { GruppiEditComponent } from './gruppi-edit/gruppi-edit.component';
import { GruppoViewComponent } from './gruppi-list/gruppo-view/gruppo-view.component';
import { AddEmojiComponent } from './gruppi-list/gruppo-view/add-emoji/add-emoji.component';

@NgModule({
  declarations: [
    GruppiComponent,
    GruppiListComponent,
    GruppiEditComponent,
    GruppoViewComponent,
    AddEmojiComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    GruppiRoutingModule,
    NgbModalModule,
    FontAwesomeModule,
    ScrollingModule,
    SharedModule
  ]
})
export class GruppiModule { }
