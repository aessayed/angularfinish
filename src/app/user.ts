export class Users {
    Id: number;
    name: string;
    email: string;
    pwd: string;
  
    
    constructor(Id:number,name: string,pwd:string,email:string) {
    this.Id = Id;
    this.name = name;
    this.pwd = pwd;
    this.email = email;
    }
    }