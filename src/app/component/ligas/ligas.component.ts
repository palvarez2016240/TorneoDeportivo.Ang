import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Liga } from 'src/app/model/liga.model';
import { LigasService } from 'src/app/service/ligas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.scss'],
  providers: [LigasService]

})
export class LigasComponent implements OnInit {

  public LigaModel:Liga;
  public liga
  public ModelIdLiga
  constructor(
    private _LigasService: LigasService,
    private _router: Router
  ) {
    this.LigaModel = new Liga('','','','')
    this.ModelIdLiga = new Liga('','','','')

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
      }
    );
  }

  eliminarLiga(id) {
    this._LigasService.EliminarLiga(id).subscribe(
      (response) => {
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


}
