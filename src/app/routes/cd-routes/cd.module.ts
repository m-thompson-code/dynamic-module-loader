import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { FeatureFlagSpliterModule } from 'src/app/feature-flag-router/feature-flag-router.module';
// import { FeatureFlagRouterModule } from 'src/app/feature-flag-router/feature-flag-router.module';
// import { FeatureFlagService } from 'src/app/services/feature-flag/feature-flag.service';

const routes: Routes = [
  {
    path: 'c/:id',
    loadChildren: () => import('./c/c.module').then(m => m.CModule),
  },
  {
    path: 'd/:id',
    loadChildren: () => import('./d/d.module').then(m => m.DModule),
  },
];

@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
    // FeatureFlagSpliterModule.forChild(routes)
  ]
})
export class CDModule { }
