import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot,Router,UrlTree  } from '@angular/router';
import { AuthService } from '../services/admin/auth.service';

@Injectable({
  providedIn:"root"
})
export class adminGuard  {
  constructor(
    private router:Router,
    private auth:AuthService
  ){}
  canActivate():boolean | UrlTree {
    const isLogin=false;
    if(!this.auth.isLoggedin()){
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }
};
