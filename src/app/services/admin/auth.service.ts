import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable,throwError,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Iuser } from 'src/app/Interface/IUser';
import { ConfigureService } from '../configure.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:Iuser = null as unknown as Iuser;

  constructor(
    private http:HttpClient,
    private config:ConfigureService,
  ) {
  }

  

  logOut(): void {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
  }

  getToken(): string {
    return localStorage.getItem('admin-token') as unknown as string;
  }

  setUserLogin({user,token}:{user:Iuser,token:string}):void {
    localStorage.setItem('admin-token',token);
    localStorage.setItem('admin-user',JSON.stringify(user));
    this.user = user;
  }



  getUser():Iuser{
    if(!this.user && localStorage.getItem("admin-user") && this.getToken()){
      const parse = localStorage.getItem("admin-user");
      if(parse){
        this.user = JSON.parse(parse) as unknown as Iuser
      }
      
      return this.user;
    }
    return this.user;
  }

  IsEmailVerified():boolean{
    return this.user.emailVerified;
  }

  GetUserStatus():boolean{
    return this.user.status;
  }

  Login(email:string,password:string):Observable<any>{
    const loginUrl:string = this.config.getBaseUrl()+"Auth/login";
    const data = {
      email:email,
      password:password
    }

    return this.http.post(loginUrl,data).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error);
      })
    )
  }

  isLoggedin(): boolean {
    let token = localStorage.getItem('admin-token');
    if(token){
      return true;
    } else {
      return false;
    }
  }

 
  GetUserByToken(token:string):Observable<any>{
    const url:string = this.config.getBaseUrl()+"Auth/get-user";
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });;
    return this.http.get(url,{headers}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(error);
      })
    )
  }

 

  


}
