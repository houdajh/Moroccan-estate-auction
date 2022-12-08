import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiServerURL=environment.apiBaseUrl2;


  constructor(private http:HttpClient) { }
  public getUser():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/`)
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerURL}/api/v1/registration/add`, user);
  }


}
