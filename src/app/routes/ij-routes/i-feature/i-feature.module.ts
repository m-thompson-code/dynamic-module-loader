import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFeatureComponent } from './i-feature.component';
import { FeatureFlagRouterModule } from 'src/app/feature-flag-router/feature-flag-router.module';
import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: IFeatureComponent,
    children: [
      {
        path: 'ij',
        loadChildren: () => import('../ij.module').then(m => m.IJModule),
      },
    ]
  },
];

@NgModule({
  declarations: [
    IFeatureComponent,
  ],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes),
  ]
})
export class IFeatureModule { }
