import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './component/inicio/inicio.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { UsuarioAdminComponent } from './component/usuario-admin/usuario-admin.component';
import { LigasComponent } from './component/ligas/ligas.component';
import { TorneosComponent } from './component/torneos/torneos.component';
import { ChartsModule } from 'ng2-charts';
import { EstadisticasComponent } from './component/estadisticas/estadisticas.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    NavbarComponent,
    InicioComponent,
    UsuariosComponent,
    UsuarioAdminComponent,
    LigasComponent,
    TorneosComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
