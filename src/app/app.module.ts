import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Shared/Layout/footer/footer.component';
import { SidebarComponent } from './Shared/Layout/sidebar/sidebar.component';
import { NavbarComponent } from './Shared/Layout/navbar/navbar.component';
import { ModalComponent } from './Shared/Layout/modal/modal.component';
import { PageNotFoundComponent } from './Shared/Layout/page-not-found/page-not-found.component';
import { HeaderComponent } from './Shared/Layout/header/header.component';
import { AuthService } from './auth/services/auth.service';
import { AuthGaurd } from './auth/services/auth-gaurd.service';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ServersModule } from './Servers/servers.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    ModalComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServersModule,
    AuthModule
  ],
  providers: [AuthService, AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
