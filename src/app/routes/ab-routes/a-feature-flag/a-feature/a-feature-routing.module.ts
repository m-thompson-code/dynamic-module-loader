import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AFeatureComponent } from './a-feature.component';

const routes: Routes = [
  {
    path: '',
    component: AFeatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AFeatureRoutingModule { }
