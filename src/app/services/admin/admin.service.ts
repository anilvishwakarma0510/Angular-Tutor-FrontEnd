import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { ConfigureService } from '../configure.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators"
import { AuthService } from './auth.service';
import { IChangePassword } from 'src/app/Interface/IUser';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient,
    private config:ConfigureService,
    private authService:AuthService
  ) { }

  ChangePassword(data:IChangePassword):Observable<any>{
    const url = this.config.getBaseUrl() + "Auth/change-password";
    const headers = this.CreateHeader();
    
    return this.http.put(url,data,{headers}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  EditProfile(data:FormData):Observable<any>{
    const url = this.config.getBaseUrl() + "Auth/edit-profile";

    const headers = this.CreateHeader();
    headers.delete('Content-Type');


    return this.http.put(url, data,{headers}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error)
      })
    )
  }

  CreateHeader():HttpHeaders{
    return new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`,
    })

  }
}


