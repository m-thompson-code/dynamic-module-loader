import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';
import { FeatureFlag } from '../../services/config/config.model';
import { FeatureFlagRoutes } from '../../feature-flag-router/factories/feature-flag-routes-factory.model';
import { FeatureFlagRouterModule } from '../../feature-flag-router/feature-flag-router.module';
import { FeatureFlagRoutesService } from '../../feature-flag-router/services/feature-flag-routes/feature-flag-routes.service';

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
class SomeFeatureFlagRoutesGetter implements FeatureFlagRoutesService {
  constructor(private readonly configService: ConfigService) {}

  getFeatureRoutes(): FeatureFlagRoutes {
    return [
      {
        path: 'g/:id',
        featureFlag: () => this.configService.configG$.pipe(map((config) => config === FeatureFlag.ON)),
        loadChildren: () => import('./g/g.module').then(m => m.GModule),
        alternativeLoadChildren: () => import('./g-feature/g-feature.module').then(m => m.GFeatureModule),
      },
    ];
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes, SomeFeatureFlagRoutesGetter),
    RouterModule.forChild(routes)
  ],
})
export class GHModule {}
