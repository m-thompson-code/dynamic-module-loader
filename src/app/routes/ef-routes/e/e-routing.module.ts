import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EComponent } from './e.component';

const routes: Routes = [
  {
    path: '',
    component: EComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ERoutingModule { }
