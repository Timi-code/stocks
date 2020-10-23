import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnergyRoutingModule } from './energy-routing.module';
import { EnergyComponent } from './energy.component';
import { IndexComponent } from './index/index.component';
import { StockComponent } from './stock/stock.component';
import { LiquidityComponent } from './liquidity/liquidity.component';
import { AttentionComponent } from './attention/attention.component';
import { ShareModule } from '../share/share.module';
import { IncrDiffComponent } from './incr-diff/incr-diff.component';


@NgModule({
  declarations: [
    EnergyComponent,
    IndexComponent,
    StockComponent,
    LiquidityComponent,
    AttentionComponent,
    IncrDiffComponent
  ],
  imports: [
    CommonModule,
    EnergyRoutingModule,
    ShareModule
  ]
})
export class EnergyModule { }
