import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JComponent } from './j.component';
import { FeatureFlagRouterModule } from 'src/app/feature-flag-router/feature-flag-router.module';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: JComponent,
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
    JComponent
  ],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes),
  ]
})
export class JModule { }
