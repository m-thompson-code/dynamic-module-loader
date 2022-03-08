import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BRoutingModule } from './b-routing.module';

@NgModule({
  providers: [],
  declarations: [],
  imports: [
    CommonModule,
    BRoutingModule
  ]
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
