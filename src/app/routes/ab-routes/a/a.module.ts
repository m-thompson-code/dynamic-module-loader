import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ARoutingModule } from './a-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ARoutingModule,
  ]
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
