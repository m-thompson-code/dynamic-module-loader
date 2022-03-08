import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagFactory } from '../../../services/feature-flag/feature-flag.model';
import { FeatureFlagService } from '../../../services/feature-flag/feature-flag.service';
import { getRoutesFactory } from '../../../services/feature-flag/routes-factory';
import { RouterModule, Routes, ROUTES } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../a/a.module').then(m => m.AModule),
  }
];

@NgModule({
  providers: [
    [{ provide: FeatureFlagFactory, useExisting: forwardRef(() => FeatureFlagService) },
    {
      provide: ROUTES,
      useFactory: getRoutesFactory(routes),
      multi: true,
      deps: [FeatureFlagFactory]
    }],
  ],
  imports: [CommonModule, RouterModule.forChild([])],
})
export class AFeatureFlagModule { }
