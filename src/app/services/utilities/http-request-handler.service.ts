import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandlerService {

  constructor(
    private http: HttpClient,
  ) { }

  public handleRequest<T>(request: Observable<HttpResponse<T>>) {
    return new Observable<T>((observer) => {
      request.subscribe({
        next: (response) => {
          if (!(response instanceof HttpResponse)) {
            observer.next(response);
          }
          else if (response.status === 401) {
            observer.error(response.body ?? 'Error de autenticación');
          }
          else if (response.status === 500) {
            observer.error(response.body ?? 'Error interno del servidor');
          }
          else if (response.status === 400) {
            observer.error(response.body ?? 'Request inválido');
          }
          else {
            observer.error(response.body ?? 'Error desconocido');
          }
        },
        error: (error) => {
          if (!(error instanceof HttpErrorResponse)) {
            observer.error(error);
          }
          else if (error.status === 401) {
            observer.error(error.error.message ?? 'Error de autenticación');
          }
          else if (error.status === 500) {
            observer.error(error.error.message ?? 'Error interno del servidor');
          }
          else if (error.status === 400) {
            observer.error(error.error.message ?? 'Request inválido');
          }
          else {
            observer.error(error.error.message ?? 'Error desconocido');
          }
        }
      });
    });
  }
}
