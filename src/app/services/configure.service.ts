import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './admin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {

  constructor(
  ) { }

  private baseUrl:string = "https://localhost:7169/api/";

  getBaseUrl():string{
    return this.baseUrl;
  }

  
}
