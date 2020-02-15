import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  loadChildren: () => import('./energy/energy.module').then(m => m.EnergyModule)
}, {
  path: 'hot',
  loadChildren: () => import('./hot/hot.module').then(m => m.HotModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
