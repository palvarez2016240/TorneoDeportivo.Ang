import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../model/equipo.model';
import { GLOBAL } from './global.service';
import { jornada } from "../model/jornada.model"

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');
  public token;
  public identidad;
  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
  }

  obtenerEquiposLiga(id :String):Observable<any>{
    return this._http.get(this.ruta + 'equiposLiga/' + id, {headers: this.headersVariable})
  }

  obtenerEquipoID(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta + 'BuscarEquipo/' + id, {headers: headersToken})
  }

  agregarEquipo(equipo: Equipo, idLiga):Observable<any>{
    let params = JSON.stringify(equipo)
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.post(this.ruta + '/Equipo/' + idLiga , params, {headers: headersToken})
  }

  editarEquipo(equipo:Equipo, idEquipo):Observable<any>{
    let params = JSON.stringify(equipo)
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + 'editarEquipo/' + idEquipo, params, {headers: headersToken})
  }

  eliminarEquipo(idEquipo):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.ruta + 'eliminarEquipo/' + idEquipo, {headers: headersToken})
  }

  obtenerToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }


  tabla(id :String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

    return this._http.get(this.ruta + '/tabla/' + id, {headers: headersToken})
  }

  llamarPDF(id :String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

    return this._http.get(this.ruta + '/llamarPDF/' + id, {headers: headersToken})
  }




//jornada

ingresarJornada(jornada: jornada, idLiga):Observable<any>{
  let params = JSON.stringify(jornada)
  let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
  return this._http.post(this.ruta + '/ingresarJornada/' + idLiga , params, {headers: headersToken})
}

}

