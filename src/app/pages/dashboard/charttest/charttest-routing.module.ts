import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharttestPage } from './charttest.page';

const routes: Routes = [
  {
    path: '',
    component: CharttestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharttestPageRoutingModule {}
