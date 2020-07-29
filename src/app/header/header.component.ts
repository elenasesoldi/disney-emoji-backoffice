import { Component, OnInit } from '@angular/core';
import { ICONS } from '../icons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  home = ICONS.home;
  group = ICONS.group;

  constructor() { }

  ngOnInit() {
  }

}
