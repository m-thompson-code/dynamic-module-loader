import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../../guards/can-activate-guard/can-activate.guard';

const routes: Routes = [
  {
    path: 'a/:id',
    loadChildren: () => import('./a-feature-flag/a-feature-flag.module').then(m => m.AFeatureFlagModule),
    // Required to load config before attempting to route to a/a-feature
    canActivate: [CanActivateGuard],
    // Required to load config before attempting to route to a/a-feature
    canLoad: [CanActivateGuard],
  },
  {
    path: 'b/:id',
    loadChildren: () => import('./b/b.module').then(m => m.BModule),
  },
  {
    path: 'ab/c/:id',
    loadChildren: () => import('../cd-routes/c/c.module').then(m => m.CModule),
  },
  {
    path: 'ab/d/:id',
    loadChildren: () => import('../cd-routes/d/d.module').then(m => m.DModule),
  },
];

@NgModule({
  declarations: [],
  providers: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class ABModule {
}
