import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';
import { StockComponent } from './stock/stock.component';
import { LiquidityComponent } from './liquidity/liquidity.component';
import { MoveBoxComponent } from './component/move-box/move-box.component';
import { AttentionComponent } from './attention/attention.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    StockComponent,
    LiquidityComponent,
    MoveBoxComponent,
    AttentionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
