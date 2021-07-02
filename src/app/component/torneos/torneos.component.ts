import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from 'src/app/model/equipo.model';
import { EquipoService } from 'src/app/service/equipo.service';
import { GLOBAL } from 'src/app/service/global.service';
import { LigasService } from 'src/app/service/ligas.service';
import { SubirImageService } from 'src/app/service/subirimagen.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss'],
  providers: [EquipoService, LigasService,SubirImageService,UsuarioService],
})
export class TorneosComponent implements OnInit {
  equipoList;
  idLiga;
  idEquipo;
  ModelIdLiga;
  public equipoModel: Equipo;
  public equipoIDModel:Equipo;
  public url;
  public token;
  constructor(
    public _ligasService: LigasService,
    private _usuarioService: UsuarioService,
    public _equipoService: EquipoService,
    public _activatedRoute: ActivatedRoute,
    private _subirService: SubirImageService
  ) {
    this.equipoModel = new Equipo('', '', 0, 0, 0, 0, 0, '', '', '');
    this.token = _usuarioService.obtenerToken()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute) => {
      this.idLiga = dataRoute.get('idLiga');
    });
    this.obtenerEquipoLiga(this.idLiga);
    this.obtenerLigaId(this.idLiga)
  }

  obtenerEquipoLiga(id) {
    this._equipoService.obtenerEquiposLiga(id).subscribe((response) => {
      this.equipoList = response.equipoEncontrado;
      console.log(response);
    });
  }

  obtenerLigaId(id) {
    this._ligasService.ligaId(id).subscribe((response) => {
      this.ModelIdLiga = response.ligaEncontrada;
      console.log(response.ligaEncontrada);
    });
  }

  agregarEquipo() {
    this._equipoService.agregarEquipo(this.equipoModel,this.idLiga).subscribe(

      (response) => {
        this.equipoModel.nombres = " "
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Equipo Creado ',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerEquipoLiga(this.idLiga)
        this.equipoModel.nombres = " "
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  limpiarVariable(){
    this.equipoModel.nombres = " "
  }
  limpiarImagen(){
    this.equipoModel.imagen = " "
  }


  obtenerEquipoID(id){
    this._equipoService.obtenerEquipoID(id).subscribe(
      response=>{
        this.equipoModel = response.equipoEncontrado
        this.idEquipo = response.equipoEncontrado._id
        console.log(response)

      }
    )
  }

  editarEquipo(){
    this._equipoService.editarEquipo(this.equipoModel,this.idEquipo ).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Equipo Editado ',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerEquipoLiga(this.idLiga)
        this.equipoModel.nombres = " "
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

  eliminarEquipo(){
    this._equipoService.eliminarEquipo(this.idEquipo).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Equipo Eliminado ',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerEquipoLiga(this.idLiga)

      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }


  subirImagen(){
    this._subirService.subirImagen(this.url + 'subirImagenEquipo/' + this.idEquipo, [], this.imagenASubir,this.token,
    'imagen' ).then((resultado)=>{
      console.log(resultado)
      this.obtenerEquipoLiga(this.idLiga)
    })
  }

  public imagenASubir: Array<File>;
  inputEvento(fileInput:any){
    this.imagenASubir = <Array<File>>fileInput.target.files;
  }

}
