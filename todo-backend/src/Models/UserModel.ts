export class User{
  constructor(public username:string, public email:string,public password:string,public firstName?:string,public lastName?:string){
    this.username = username,
    this.email =  email,
    this.password = password,
    this.firstName = firstName,
    this.lastName = lastName
  }
}