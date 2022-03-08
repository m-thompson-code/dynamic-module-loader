import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FComponent } from './f.component';

const routes: Routes = [
  {
    path: '',
    component: FComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FRoutingModule { }
