import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { RegistroComponent } from './component/registro/registro.component';
import {InicioComponent } from './component/inicio/inicio.component';
import { UsuariosComponent} from './component/usuarios/usuarios.component'
import {LigasComponent} from './component/ligas/ligas.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'Registro',component:RegistroComponent},
  {path:'Perfil',component:PerfilComponent},
  // routing de inicio y usuarios
  {path: "Inicio",component:InicioComponent},
  {path: "Usuarios", component:UsuariosComponent},
  {path: "Ligas", component:LigasComponent},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
