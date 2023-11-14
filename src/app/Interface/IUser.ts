export type Iuser = {
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    profileImage?:string|null,
    phoneNumber?:string|null,
    userRole:{
        id:number,
        name:string
    },
    emailVerified:boolean,
    status:boolean
}

export type IChangePassword = {
    currentPassword:string,
    newPassword:string,
    confirmPassword:string,
  }