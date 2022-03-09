import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EComponent } from './e.component';
import { FeatureFlagRouterModule } from '../../../feature-flag-router/feature-flag-router.module';
import { FeatureFlagRoutes } from '../../../feature-flag-router/factories/feature-flag-routes-factory.model';

let toggle = false;
(window as any).test = () => { toggle = !toggle; return toggle };

const routes: FeatureFlagRoutes = [
  {
    path: '',
    component: EComponent
  },

  {
    path: 'feature',
    featureFlag: () => toggle,
    loadChildren: () => import('../../not-found/not-found.module').then(m => m.NotFoundModule),
    alternativeLoadChildren: () => import('../e-feature/e-feature.module').then(m => m.EFeatureModule),
  },
];

@NgModule({
  declarations: [EComponent],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes)
  ],
})
export class EModule { }
