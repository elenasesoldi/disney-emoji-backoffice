import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GruppiComponent } from './gruppi.component';


const routes: Routes = [{
  path: '',
  component: GruppiComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruppiRoutingModule { }
