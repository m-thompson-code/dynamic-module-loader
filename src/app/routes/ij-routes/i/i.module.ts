import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FeatureFlagRouterModule } from '@demo/feature-flag-router-module';

import { IComponent } from './i.component';

const routes: Routes = [
  {
    path: '',
    component: IComponent,
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
    IComponent
  ],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes),
  ]
})
export class IModule { }
