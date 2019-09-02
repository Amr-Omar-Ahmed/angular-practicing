import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CustomPreloadingService } from './services/custom-preloading.service';
import { DataStorageService } from './services/data-storage.service';
import { LayoutService } from './Services/layout.service';
import { AuthGaurd } from './gaurds/auth-gaurd.service';

import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ModalComponent } from './layout/modal/modal.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from '../Shared/shared.module';

const coreComponents = [
  FooterComponent, SidebarComponent, NavbarComponent,
  ModalComponent, PageNotFoundComponent, HeaderComponent
]

@NgModule({
  declarations: [...coreComponents],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [...coreComponents],
  providers: [AuthService, DataStorageService, LayoutService, AuthGaurd]
})
export class CoreModule { }
