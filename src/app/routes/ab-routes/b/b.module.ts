import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BComponent } from './b.component';

const routes: Routes = [
  {
    path: '',
    component: BComponent
  }
];

@NgModule({
  declarations: [BComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class BModule implements OnInit, OnDestroy {
  constructor() {
    console.log("BModule constructor");
    console.log(this);
  }

  ngOnInit(): void {
    console.log("BModule ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("BModule onDestroy");
  }
}
