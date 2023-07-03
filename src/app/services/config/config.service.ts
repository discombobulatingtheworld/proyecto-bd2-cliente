import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public getBackendUrl(): string {
    return `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
  }
}
