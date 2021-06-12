import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { RegistroComponent } from './component/registro/registro.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'Registro',component:RegistroComponent},
  {path:'Perfil',component:PerfilComponent},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
