import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EComponent } from './e.component';

const routes: Routes = [
  {
    path: '',
    component: EComponent
  }
];

@NgModule({
  declarations: [EComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class EModule { }
