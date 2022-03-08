import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './a.component';

const routes: Routes = [
  {
    path: '',
    component: AComponent
  }
];

@NgModule({
  declarations: [AComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class AModule implements OnInit, OnDestroy {
  constructor() {
    console.log("AModule constructor");
    console.log(this);
  }

  ngOnInit(): void {
    console.log("AModule ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("AModule onDestroy");
  }
}
