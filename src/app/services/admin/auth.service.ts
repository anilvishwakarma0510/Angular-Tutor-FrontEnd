import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Iuser } from 'src/app/Interface/IUser';
import { ConfigureService } from '../configure.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Iuser = null as unknown as Iuser;

  private userSubject = new BehaviorSubject<Iuser | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private config: ConfigureService,
  ) {
  }



  logOut(): void {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
  }

  getToken(): string {
    return localStorage.getItem('admin-token') as unknown as string;
  }

  setUserLogin({ user, token }: { user: Iuser, token?: string }): void {
    if (token && token !== undefined) { localStorage.setItem('admin-token', token) };
    if (user) { 
      localStorage.setItem('admin-user', JSON.stringify(user));
      this.userSubject.next(user);
      this.user = user;
    };
  }



  getUser(): Iuser {
   
    if (!this.user && localStorage.getItem("admin-user") && this.getToken()) {
      const  parse = localStorage.getItem("admin-user");
      const data = parse ? JSON.parse(parse) : null;
      if (data) {
        this.setUserLogin({user:data})
      }

      return this.user;
    }
    return this.user;
  }

  IsEmailVerified(): boolean {
    return this.user.emailVerified;
  }

  GetUserStatus(): boolean {
    return this.user.status;
  }

  Login(email: string, password: string): Observable<any> {
    const loginUrl: string = this.config.getBaseUrl() + "Auth/login";
    const data = {
      email: email,
      password: password
    }

    return this.http.post(loginUrl, data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }

  isLoggedin(): boolean {
    let token = localStorage.getItem('admin-token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }


  GetUserByToken(token: string): Observable<any> {
    const url: string = this.config.getBaseUrl() + "Auth/get-user";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });;
    return this.http.get(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }






}
