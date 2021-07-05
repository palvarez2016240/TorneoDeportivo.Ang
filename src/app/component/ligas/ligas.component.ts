import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Liga } from 'src/app/model/liga.model';
import { GLOBAL } from 'src/app/service/global.service';
import { LigasService } from 'src/app/service/ligas.service';
import { SubirImageService } from 'src/app/service/subirimagen.service';
import { UsuarioService } from 'src/app/service/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.scss'],
  providers: [LigasService,SubirImageService,UsuarioService]

})
export class LigasComponent implements OnInit {

  public LigaModel:Liga;
  public liga
  public ModelIdLiga;
  public token;
  public url;
  public idL;
  constructor(
    private _LigasService: LigasService,
    public _usuarioService: UsuarioService,
    private _SubirService: SubirImageService,
    private _router: Router
  ) {
    this.LigaModel = new Liga('','','','')
    this.ModelIdLiga = new Liga('','','','')
    this.token = _usuarioService.obtenerToken()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this.verLigas()
  }

  AgregarLiga(){
    this._LigasService.Liga(this.LigaModel).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Liga agregada',
          showConfirmButton: false,
          timer: 1500
        })

        this.verLigas()      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  //borrar
  vacio(id){

  }


  verLigas() {
    this._LigasService.ObtenerLigas().subscribe(
      (response) => {

        this.liga = response.ligaEncontrada
        console.log(response);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Sin ligas',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  obtenerLigaId(id) {
    this._LigasService.ligaId(id).subscribe((response) => {
      this.ModelIdLiga = response.ligaEncontrada;
      this.idL = response.ligaEncontrada._id
      console.log(response.ligaEncontrada);
    });
  }

  EditarLiga(id) {
    this._LigasService.EditarLiga(this.ModelIdLiga, id).subscribe(
      (response) => {
        console.log(response);
        this.verLigas()
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje,
        })
      }
    );
  }

  eliminarLiga(id) {
    this._LigasService.EliminarLiga(id).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Liga eliminada',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(response);
        this.verLigas()
      },
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  limpiarImagen(){
    this.LigaModel.imagen = " "
  }

  subirImagen(){
    this._SubirService.subirImagen(this.url + 'subirImagenLiga/' + this.idL , [], this.imagenASubir, this.token,
    'imagen').then((resultado)=>{
      console.log(resultado)
      this.verLigas()
    },
    (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tipo de archivo no permitida',
      })
    }
    )
  }

  public imagenASubir: Array<File>;
  inputEvento(fileInput:any){
    this.imagenASubir = <Array<File>>fileInput.target.files;
  }

  limpiarLabel(){
    this.LigaModel.nombres = '';
  }
}
