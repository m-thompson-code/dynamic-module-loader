import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Routes } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';
import { FeatureFlag } from '../../services/config/config.model';
import { FeatureFlagRoute, FeatureFlagRoutesGetter } from '../../feature-flag-router/feature-flag-routes-factory.model';
import { FeatureFlagRouterModule } from '../../feature-flag-router/feature-flag-router.module';

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
class SomeFeatureFlagRoutesGetter implements FeatureFlagRoutesGetter {
  constructor(private readonly configService: ConfigService) {}

  getFeatureRoutes(): FeatureFlagRoute[] {
    return [
      {
        path: 'g/:id',
        getFeatureFlag$: this.configService.configG$.pipe(map((config) => config === FeatureFlag.ON)),
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
    FeatureFlagRouterModule.forChild(routes, SomeFeatureFlagRoutesGetter)
  ],
})
export class GHModule {}
