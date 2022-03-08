import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DComponent } from './d.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DComponent
  }
];

@NgModule({
  declarations: [
    DComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class DModule implements OnInit, OnDestroy {
  constructor() {
    console.log("DModule constructor");
    console.log(this);
  }

  ngOnInit(): void {
    console.log("DModule ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("DModule onDestroy");
  }
}

