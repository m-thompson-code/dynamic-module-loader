import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComponent } from './i.component';
import { Routes } from '@angular/router';
import { FeatureFlagRouterModule } from 'src/app/feature-flag-router/feature-flag-router.module';

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
