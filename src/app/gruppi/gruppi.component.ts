import { Component, OnInit } from '@angular/core';
import { GruppoService } from 'src/service/gruppo.service';
import { Gruppo } from 'src/model/gruppo.model';

@Component({
  selector: 'app-gruppi',
  templateUrl: './gruppi.component.html',
  styleUrls: ['./gruppi.component.scss']
})
export class GruppiComponent implements OnInit {

  gruppi: Gruppo[];

  constructor(private gruppoService: GruppoService) { }

  ngOnInit() {
    this.gruppoService.gruppi.subscribe((data: Gruppo[]) => {
      this.gruppi = data;
    });
  }

}
