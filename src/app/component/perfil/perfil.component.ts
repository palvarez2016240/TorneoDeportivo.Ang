import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService],
})
export class PerfilComponent implements OnInit {
  usuariosList;
  userActualizado;
  usuarioIDModel: Usuario;
  public identidad;
  constructor(public _usuarioService: UsuarioService, private _router: Router) {
    this.usuarioIDModel = new Usuario('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {}

  obtenerUsuarioId(id) {
    this._usuarioService.obtenerUserID(id).subscribe((response) => {
      this.usuarioIDModel = response.usuarioEncontrado;
      this.userActualizado = response.usuarioEncontrado;
      console.log(response.usuarioEncontrado);
    });
  }

  editarUser(id) {
    this._usuarioService.editarPerfil(this.usuarioIDModel, id).subscribe(
      (response) => {
        this.identidad = response.userActualizado;
        console.log(response);
        localStorage.setItem('identidad', JSON.stringify(this.identidad));
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  eliminarUser(id) {
    this._usuarioService.eliminarUser(id).subscribe(
      (response) => {
        console.log(response);
        this._router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario Eliminado',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }


}
