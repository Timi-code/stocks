import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotComponent } from './hot.component';


const routes: Routes = [{
  path: '',
  component: HotComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotRoutingModule { }
