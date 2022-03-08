import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagRoute, FeatureFlagRoutesGetter } from '../../feature-flag-router/feature-flag-routes-factory.model';
import { RouterModule, Routes } from '@angular/router';
import { FeatureFlagRouterModule } from '../../feature-flag-router/feature-flag-router.module';
import { ConfigService } from '../../services/config/config.service';
import { map } from 'rxjs';
import { FeatureFlag } from '../../services/feature-flag/feature-flag.model';

const routes: Routes = [
  {
    path: 'g/:id',
    loadChildren: () => import('./g/g.module').then(m => m.GModule),
  },
  {
    path: 'h/:id',
    loadChildren: () => import('./h/h.module').then(m => m.HModule),
  },
];

@Injectable({
  providedIn: 'root',
})
class SomeService implements FeatureFlagRoutesGetter {
  constructor(private readonly configService: ConfigService) {}

  getFeatureRoutes(): FeatureFlagRoute[] {
    return [
      {
        path: 'g/:id',
        getFeatureFlag$: this.configService.config$.pipe(map((config) => config === FeatureFlag.ON)),
        loadChildren: () => import('./g/g.module').then(m => m.GModule),
        loadFeatureChildren: () => import('./g-feature/g-feature.module').then(m => m.GFeatureModule),
      },
    ];
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes, SomeService)
  ],
})
export class GHModule {}
