import { forwardRef, NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { CanActivateService } from 'src/app/services/can-activate-guard/can-activate-guard.service';
import { FeatureFlagFactory } from 'src/app/services/feature-flag/feature-flag.model';
import { FeatureFlagService } from 'src/app/services/feature-flag/feature-flag.service';
import { getRoutesFactory } from 'src/app/services/feature-flag/routes-factory';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../a/a.module').then(m => m.AModule),
    // loadChildren: () => import('./a-feature/a-feature.module').then(m => m.AFeatureModule),
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
  imports: [RouterModule.forChild([])],
  exports: [RouterModule]
})
export class AFeatureFlagRoutingModule {
  constructor() {
    console.log(this);
  }
}
