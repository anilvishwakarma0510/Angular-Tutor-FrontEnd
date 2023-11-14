
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IChangePassword, Iuser } from 'src/app/Interface/IUser';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/admin/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  error:string|null = null;
  success:string|null = null;
  previewImage: string | ArrayBuffer | null = null;
  fileError:string|boolean = false;
  user:Iuser|null = null;
  matchPasswordError:string|boolean = false;

  changePassword = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
  });

  constructor(
    private auth:AuthService,
    private adminService:AdminService
    ) {
    this.user = this.auth.getUser();
    
  }

  onNgInit(){
    
  }
  

  get f(){
    return this.changePassword.controls;
  }

  handleSubmit(){
    this.matchPasswordError = false;
    if(this.changePassword.valid){

      

      if(this.changePassword.value.newPassword !== this.changePassword.value.confirmPassword){
        //this.matchPasswordError = "New Password not matched with confirm Password";
        //return
      }
      
      const data:IChangePassword = {
        currentPassword  : String(this.changePassword.value.currentPassword),
        newPassword  : String(this.changePassword.value.newPassword),
        confirmPassword  : String(this.changePassword.value.confirmPassword),
      }

      this.adminService.ChangePassword(data).subscribe(
        (data)=>{
          this.success = "Password has been changed successfully.";
          this.changePassword.reset()
          setTimeout(()=>{
            this.success = null;
          },3000)
        },
        (error)=>{
          this.error = "Something went wrong, try again later."
          console.log(error)
          if(error.status === 401){
            this.error = "Token expried";
          } else if(error.status === 400){
            
            if(error?.error?.errors){
              
              const firstErrorMessage = Object.values<string>(error?.error?.errors)[0][0];
         
              this.error = firstErrorMessage

            } else if(error?.error?.message){
              
                this.error = error?.error?.message
  
            }
          }
          

          setTimeout(()=>{
            this.error = null;
          },3000)
        }
      )


    }
  }


 

}
