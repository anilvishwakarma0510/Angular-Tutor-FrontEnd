export type Iuser = {
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    profileImage?:string|null,
    userRole:{
        id:number,
        name:string
    },
    emailVerified:boolean,
    status:boolean
}