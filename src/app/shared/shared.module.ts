
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
  ]
})
export class SharedModule { }
