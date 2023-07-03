import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { Observable, firstValueFrom } from 'rxjs';
import { HabilidadesCategoria } from 'src/app/types/dtos/habilidades-categoria';
import { ConfigService } from '../config/config.service';
import { HttpRequestHandlerService } from '../utilities/http-request-handler.service';


@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private httpHandler: HttpRequestHandlerService
  ) { }

  getHabilidades(): Observable<Habilidad[]> {
    let req = this.http.get<HttpResponse<Habilidad[]>>(`${this.configService.getBackendUrl()}/api/habilidades`);
    return this.httpHandler.handleRequest(req);
  }

  getHabilidadesCategoria(): Observable<HabilidadesCategoria[]> {
    let req = this.http.get<HttpResponse<HabilidadesCategoria[]>>(`${this.configService.getBackendUrl()}/api/habilidades/categorias`);	
    return this.httpHandler.handleRequest(req);
  }
}


