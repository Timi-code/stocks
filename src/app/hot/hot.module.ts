import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';

import { HotRoutingModule } from './hot-routing.module';
import { HotComponent } from './hot.component';
import { Top20Component } from './top20/top20.component';
import { HotContrastComponent } from './hot-contrast/hot-contrast.component';


@NgModule({
  declarations: [HotComponent, Top20Component, HotContrastComponent],
  imports: [
    CommonModule,
    HotRoutingModule,
    ShareModule
  ]
})
export class HotModule { }
