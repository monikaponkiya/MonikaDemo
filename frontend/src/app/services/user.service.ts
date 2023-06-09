import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { isNull, isUndefined } from 'lodash-es';
const baseUrl = 'http://localhost:4444/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(data: any): Observable<User> {
    return this.http.post<User>(baseUrl + `login`, data);
  }
  register(data: any): Observable<any> {
    debugger
    return this.http.post(baseUrl + `user`, data);
  }
  getUsers(search: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}users?search=${search}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}user/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}user/${id}`);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}user/${id}`);
  }
  emailSend(payload: any): Observable<any> {
    return this.http.post(baseUrl + `email`, payload);
  }
}
