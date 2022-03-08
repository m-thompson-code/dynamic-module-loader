import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CComponent } from './c.component';

const routes: Routes = [
    {
      path: '',
      component: CComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRoutingModule {
  constructor() {
    console.log("CRoutingModule constructor");
  }
}
