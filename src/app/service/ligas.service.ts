import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Liga} from '../model/liga.model';

@Injectable({
  providedIn: 'root'
})
export class LigasService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');
  public token;
  public identidad;
  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
  }

  ObtenerLigas():Observable<any>{

    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta + "/ObtenerLigas" ,{headers: headersToken})
  }

  //Liga
  Liga(liga: Liga):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());

    let params = JSON.stringify(liga);
    return this._http.post(this.ruta + '/Liga', params,{headers: headersToken})
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

}
