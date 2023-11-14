import { Component } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from 'src/app/Interface/IUser';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/admin/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  error:string|null = null;
  success:string|null = null;
  editProfile: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  fileError:string|boolean = false;
  user:Iuser|null = null;

  constructor(
    private fb: FormBuilder,
    private auth:AuthService,
    private adminService:AdminService
    ) {
      debugger;
    this.user = this.auth.getUser();
    this.editProfile = this.fb.group({
      firstName: [this.user?.firstName, [Validators.required]],
      lastName: [this.user?.lastName, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phoneNumber: [
        this.user?.phoneNumber,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10)
        ]
      ],
      profileImage: [null] // Add a form control for file input
    });

    
  }
  

  get f(){
    return this.editProfile.controls;
  }

  handleSubmit(){

    if(this.editProfile.valid){
      const formData = new FormData();
      formData.append("FirstName",this.editProfile.value.firstName);
      formData.append("LastName",this.editProfile.value.lastName);
      formData.append("Email",this.editProfile.value.email);
      formData.append("PhoneNumber",this.editProfile.value.phoneNumber);

      const profileImage = this.editProfile.get("profileImage")?.value;
      if(profileImage instanceof File){
        formData.append("ProfileImage",profileImage,profileImage.name)
      }


      this.adminService.EditProfile(formData).subscribe(
        (data)=>{
          console.log("success",data)

          this.success = "Profile has been updated successfully.";

          const user = data.user;
          delete user.$id;
          delete user.userRole.$id;
          this.auth.setUserLogin({user:user})
      
          setTimeout(()=>{
            this.success = null;
          },3000)
        },
        (error)=>{
          this.error = "Something went wrong, try again later."
          console.error("error",error)
          if(error.status===401){
            this.error = "Token expried";
          }

          setTimeout(()=>{
            this.error = null;
          },3000)
        }
      )


    }
  }

  onFileSelect(event:any){

    const file = event.target.files[0];

    // Validate the file type and size
    if (this.validateFile(file)) {
      this.editProfile.patchValue({
        profileImage: file
      });

    } else {
      // Reset the file input if it's not valid
      this.editProfile.patchValue({
        profileImage: null
      });

    }

  }

  validateFile(file: File): boolean {
    // Validate file type (allow only images)
    this.fileError = false
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.fileError = "Invalid image, only jpeg, png and gif allowed";
      return false;
    }

    // Validate file size (max size in bytes)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      this.fileError = "You can upload up to 5MB";
      return false;
    }

    return true;
  }
}
