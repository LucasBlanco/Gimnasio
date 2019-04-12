import { LayoutModule } from "../layout/layout.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { ActionComponent } from "./header/action/action.component";
import { ProfileComponent } from "./header/profile/profile.component";
import { CoreModule } from "../../core/core.module";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { HttpClientModule } from "@angular/common/http";
import { ErrorPageComponent } from "./snippets/error-page/error-page.component";
import { AbmSociosComponent } from "./components/abm-socios/abm-socios.component";
import { SharedModule } from "./components/shared-components/shared.module";
import { AMSociosComponent } from "./components/abm-socios/am-socios/am-socios.component";
import { TablaSociosComponent } from "./components/abm-socios/tabla-socios/tabla-socios.component";
import { CajaComponent } from "./components/caja/caja.component";
import { HttpServiceSocios } from "../services/httpServiceSocios";
import { HttpServiceCaja } from "../services/httpServiceCaja";
import { HttpModule } from "@angular/http";
import { IngresosComponent } from "./components/caja/ingresos/ingresos.component";
import { TablaMovimientosComponent } from "./components/caja/movimientos/tabla-movimientos.component";
import { SociosModule } from "./components/socio/socios.module";
import { NavegacionSocioComponent } from "./components/socio/navegacion-socio/navegacion-socio.component";
import { AbmMembresiaComponent } from "./components/abm-membresia/abm-membresia.component";
import { HttpServiceMembresia } from "../services/httpServiceMembresia";
import { AmMembresiaComponent } from "./components/abm-membresia/am-membresia/am-membresia.component";
import { TablaMembresiaComponent } from "./components/abm-membresia/tabla-membresia/tabla-membresia.component";
import { AbmServicioComponent } from "./components/abm-servicio/abm-servicio.component";
import { AmServicioComponent } from "./components/abm-servicio/am-servicio/am-servicio.component";
import { TablaServicioComponent } from "./components/abm-servicio/tabla-servicio/tabla-servicio.component";
import { HttpServiceServicio } from "../services/httpServiceServicio";
import { HttpServiceDescuento } from "../services/httpServiceDescuento";
import { AbmDescuentoComponent } from "./components/abm-descuento/abm-descuento.component";
import { AmDescuentoComponent } from "./components/abm-descuento/am-descuento/am-descuento.component";
import { TablaDescuentoComponent } from "./components/abm-descuento/tabla-descuento/tabla-servicio.component";
import { HttpService } from "../services/httpService";
import { SociosService } from "./components/socio/serviceSocio";
import { AbmProductoComponent } from "./components/abm-producto/abm-producto.component";
import { AmProductoComponent } from "./components/abm-producto/am-producto/am-producto.component";
import { TablaProductoComponent } from "./components/abm-producto/tabla-producto/tabla-producto.component";

import { PartialsModule } from "../partials/partials.module";
import { NgxTypeaheadModule } from "ngx-typeahead";
import { VencimientoSociosComponent } from "./components/vencimiento-socios/vencimiento-socios.component";
import { AbmProfesoresComponent } from "./components/abm_profesor/abm-profesor.component";
import { AMProfesoresComponent } from "./components/abm_profesor/am-profesor/am-profesor.component";
import { TablaProfesoresComponent } from "./components/abm_profesor/tabla-profesor/tabla-profesor.component";
import { GestionStockComponent } from "./components/stock/gestion-stock.component";
import { HistorialStockComponent } from "./components/stock/historial-stock.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { PresenteComponent } from "./components/clases/clases.component";
import { TomarPresenteComponent } from "./components/clases/tomar-presente/tomar-presente.component";
import { ListaAsistentesComponent } from "./components/clases/tomar-presente/lista-asistentes/lista-asistentes.component";
import { TablaClasesComponent } from "./components/abm_clase/tabla-clase/tabla-clase.component";
import { AbmClasesComponent } from "./components/abm_clase/abm-clase.component";
import { AmClasesComponent } from "./components/abm_clase/am-clase/am-clase.component";
import { ListaClasesComponent } from "./components/clases/tomar-presente/lista-clases/lista-clases.component";
import { ClaseComponent } from "./components/abm_clase/am-clase/clase/clase.component";
import { AlumnosComponent } from "./components/abm_clase/am-clase/alumnos/alumnos.component";

@NgModule({
  declarations: [
    PagesComponent,
    ActionComponent,
    ProfileComponent,
    ErrorPageComponent,
    AbmSociosComponent,
    AMSociosComponent,
    TablaSociosComponent,
    CajaComponent,
    IngresosComponent,
    TablaMovimientosComponent,
    AmMembresiaComponent,
    TablaMembresiaComponent,
    AbmMembresiaComponent,
    AmServicioComponent,
    TablaServicioComponent,
    AbmServicioComponent,
    AbmDescuentoComponent,
    AmDescuentoComponent,
    TablaDescuentoComponent,
    VencimientoSociosComponent,
    AbmProfesoresComponent,
    AMProfesoresComponent,
    AbmProductoComponent,
    AmProductoComponent,
    TablaProductoComponent,
    TablaProfesoresComponent,
    GestionStockComponent,
    HistorialStockComponent,
    PresenteComponent,
    TomarPresenteComponent,
    ListaAsistentesComponent,
    AbmClasesComponent,
    AmClasesComponent,
    TablaClasesComponent,
    ListaClasesComponent,
    ClaseComponent,
    AlumnosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    HttpModule,
    PagesRoutingModule,
    CoreModule,
    LayoutModule,
    AngularEditorModule,
    SharedModule,
    SociosModule,
    PartialsModule,
    NgxTypeaheadModule,
    NgSelectModule
  ],
  providers: []
})
export class PagesModule {}
