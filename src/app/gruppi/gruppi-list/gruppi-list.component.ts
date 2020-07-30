import { Component, OnInit, Input } from '@angular/core';
import { Gruppo } from '../../../model/gruppo.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GruppiEditComponent } from '../gruppi-edit/gruppi-edit.component';

@Component({
  selector: 'app-gruppi-list',
  templateUrl: './gruppi-list.component.html',
  styleUrls: ['./gruppi-list.component.scss']
})
export class GruppiListComponent implements OnInit {

  @Input()
  gruppi: Gruppo[];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  aggiungi(): void {
    const modal = this.modalService.open(GruppiEditComponent);
  }


}
