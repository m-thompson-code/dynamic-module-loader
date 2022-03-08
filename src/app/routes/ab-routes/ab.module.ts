import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateService } from '../../services/can-activate-guard/can-activate-guard.service';

const routes: Routes = [
  {
    path: 'a/:id',
    loadChildren: () => import('./a-feature-flag/a-feature-flag.module').then(m => m.AFeatureFlagModule),
    // Required to load config before attempting to route to a/a-feature
    canActivate: [CanActivateService],
    // Required to load config before attempting to route to a/a-feature
    canLoad: [CanActivateService],
  },
  {
    path: 'b/:id',
    loadChildren: () => import('./b/b.module').then(m => m.BModule),
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
