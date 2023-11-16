import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharttestPageRoutingModule } from './charttest-routing.module';

import { CharttestPage } from './charttest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharttestPageRoutingModule
  ],
  declarations: [CharttestPage]
})
export class CharttestPageModule {}
