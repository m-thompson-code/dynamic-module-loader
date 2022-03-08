import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CComponent } from './c.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CComponent,
  }
];

@NgModule({
  declarations: [
    CComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CModule implements OnInit, OnDestroy {
  constructor() {
    console.log("CModule constructor");
    console.log(this);
  }

  ngOnInit(): void {
    console.log("CModule ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("CModule onDestroy");
  }
}
