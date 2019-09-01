import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerHomePageComponent } from './server-home-page/server-home-page.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ServerHomePageComponent, CockpitComponent, ServerElementComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [ServerHomePageComponent, CockpitComponent, ServerElementComponent]

})
export class ServersModule { }
