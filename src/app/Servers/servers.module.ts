import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';

import { ServerHomePageComponent } from './server-home-page/server-home-page.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';



@NgModule({
  declarations: [ServerHomePageComponent, CockpitComponent, ServerElementComponent],
  imports: [
    SharedModule
  ],

})
export class ServersModule { }
