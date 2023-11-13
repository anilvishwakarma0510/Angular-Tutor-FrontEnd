import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons';
import { Iuser } from 'src/app/Interface/IUser';
import { AuthService } from 'src/app/services/admin/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error : string = '';
  
  constructor(
    private router:Router,
    private authService:AuthService
    ){}

  ngOnInit(){
    if(this.authService.isLoggedin()){

      this.router.navigate(['/admin/dashboard']);
    }
  }

  faEnvelope = faEnvelope;
  faLock = faLock


  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])
  })

  handleSubmit():void{
    console.log(this.loginForm.value)

    if(this.loginForm.valid){
      const email = String(this.loginForm.value.email);
      const password = String(this.loginForm.value.password);
      const auth = this.authService.Login(email,password).subscribe(
        (data)=>{
          if(data.user.userRole.id===1 || data.user.userRole.id===2){
            this.error = '';
            delete data.user.$id;
            delete data.user.userRole.$id;
            this.authService.setUserLogin({user:data.user,token:data.token});
            this.router.navigate(["/admin/dashboard"])
          } else {
            this.error = 'You are not authorized to access admin panel, please contact to admin.';
          }
          
        },
        (error)=>{
          if (error.status === 401) {
            this.error = 'Invalid credentials';
          } else if (error.status === 405) {
            this.error = 'Mathod not allowed.';
          } else {
            this.error = 'Something went wrong.';
          }
        }
      )
    }
  }

  get f(){
    return this.loginForm.controls;
  }
}
