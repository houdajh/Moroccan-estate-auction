import { ArrayType } from "@angular/compiler"

export class Appuser {
    id!:number
    firstName!:string
    lastName!:string
    adresse!:string
    phone!:string
    email!:string
    password!:string
    appUserRole!:string
    locked!:boolean
    enabled!:boolean
    username!:string
    authorities!:ArrayType
    accountNonExpired!:boolean
    credentialsNonExpired!:boolean
    accountNonLocked!:boolean

}
