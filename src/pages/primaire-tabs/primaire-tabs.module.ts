import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimaireTabsPage } from './primaire-tabs';

@NgModule({
  declarations: [
    PrimaireTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(PrimaireTabsPage),
  ]
})
export class PrimaireTabsPageModule {}
