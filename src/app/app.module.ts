import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationModule } from './core/auth/authentication.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeApiService } from './fake-api/fake-api.service';

import { LayoutModule } from './content/layout/layout.module';
import { PartialsModule } from './content/partials/partials.module';
import { CoreModule } from './core/core.module';
import { AclService } from './core/services/acl.service';
import { LayoutConfigService } from './core/services/layout-config.service';
import { MenuConfigService } from './core/services/menu-config.service';
import { PageConfigService } from './core/services/page-config.service';
import { UserService } from './core/services/user.service';
import { UtilsService } from './core/services/utils.service';
import { ClassInitService } from './core/services/class-init.service';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig, MatProgressSpinnerModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { MessengerService } from './core/services/messenger.service';
import { ClipboardService } from './core/services/clipboard.sevice';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LayoutConfigStorageService } from './core/services/layout-config-storage.service';
import { LogsService } from './core/services/logs.service';
import { QuickSearchService } from './core/services/quick-search.service';
import { SubheaderService } from './core/services/layout/subheader.service';
import { HeaderService } from './core/services/layout/header.service';
import { MenuHorizontalService } from './core/services/layout/menu-horizontal.service';
import { MenuAsideService } from './core/services/layout/menu-aside.service';
import { LayoutRefService } from './core/services/layout/layout-ref.service';
import { SplashScreenService } from './core/services/splash-screen.service';
import { DataTableService } from './core/services/datatable.service';

import 'hammerjs';
import { HttpServiceEntrada } from './content/services/httpServiceEntrada';
import { HttpService } from './content/services/httpService';
import { HttpModule } from '@angular/http';
import { HttpServiceSocios } from './content/services/httpServiceSocios';
import { HttpServiceCaja } from './content/services/httpServiceCaja';
import { HttpServiceMembresia } from './content/services/httpServiceMembresia';
import { HttpServiceServicio } from './content/services/httpServiceServicio';
import { HttpServiceDescuento } from './content/services/httpServiceDescuento';
import { HttpServiceProfesor } from './content/services/httpServiceProfesor';
import { SociosService } from './content/pages/components/socio/serviceSocio';
import { HttpServiceProducto } from './content/services/httpServiceProducto';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthService } from 'ngx-auth';
import { AuthGuardService } from './content/services/authService';
import { HttpServiceStock } from './content/services/httpServiceStock';
import { HttpServiceClase } from './content/services/httpServiceClase';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeApiService),
    LayoutModule,
    PartialsModule,
    CoreModule,
    OverlayModule,
    AuthenticationModule,
    NgxPermissionsModule.forRoot(),
    NgbModule.forRoot(),
    TranslateModule.forRoot(),
    MatProgressSpinnerModule,
    HttpModule
  ],
  providers: [
    AclService,
    LayoutConfigService,
    LayoutConfigStorageService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    UserService,
    UtilsService,
    ClassInitService,
    MessengerService,
    ClipboardService,
    LogsService,
    QuickSearchService,
    DataTableService,
    SplashScreenService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },

    // template services
    SubheaderService,
    HeaderService,
    MenuHorizontalService,
    MenuAsideService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    },
    HttpServiceEntrada,
    HttpService,
    HttpServiceSocios,
    HttpServiceCaja,
    HttpServiceMembresia,
    HttpServiceServicio,
    HttpServiceDescuento,
    HttpServiceProfesor,
    HttpServiceProducto,
    HttpServiceStock,
    SociosService,
    HttpServiceClase,
    AuthGuardService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
