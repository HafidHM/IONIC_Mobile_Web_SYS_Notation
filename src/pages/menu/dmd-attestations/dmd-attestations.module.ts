import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DmdAttestationsPage } from './dmd-attestations';

@NgModule({
  declarations: [
    DmdAttestationsPage,
  ],
  imports: [
    IonicPageModule.forChild(DmdAttestationsPage),
  ],
})
export class DmdAttestationsPageModule {}
