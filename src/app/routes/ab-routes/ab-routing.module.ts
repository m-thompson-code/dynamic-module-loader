import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'a/:id',
    loadChildren: () => import('./a-feature-flag/a-feature-flag.module').then(m => m.AFeatureFlagModule),
  },
  {
    path: 'b/:id',
    loadChildren: () => import('./b/b.module').then(m => m.BModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ABRoutesRoutingModule { }
