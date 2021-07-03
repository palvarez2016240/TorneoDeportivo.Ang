import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { RegistroComponent } from './component/registro/registro.component';
import {InicioComponent } from './component/inicio/inicio.component';
import { UsuariosComponent} from './component/usuarios/usuarios.component'
import {LigasComponent} from './component/ligas/ligas.component';
import { TorneosComponent } from './component/torneos/torneos.component';
import { EstadisticasComponent} from './component/estadisticas/estadisticas.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'Registro',component:RegistroComponent},
  {path:'Perfil',component:PerfilComponent},
  // routing de inicio y usuarios
  {path: "Inicio",component:InicioComponent},
  {path: "Usuarios", component:UsuariosComponent},
  {path: "Ligas", component:LigasComponent},
  {path: "Torneos/:idLiga",component:TorneosComponent},
  {path: "Estadisticas/:idLiga",component: EstadisticasComponent},

  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
