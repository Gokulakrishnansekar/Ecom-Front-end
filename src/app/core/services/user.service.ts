import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/app/model/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  API_URL = 'http://localhost:8080/api';
  getUsers(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(`${this.API_URL}/users`);
  }

  deleteUsersbyId(id: number) {
    return this.http.delete<void>(`${this.API_URL}/users/${id}`);
  }

  registerUser(user: UsersModel) {
    return this.http.post<any>(`${this.API_URL}/users/register`, user);
  }
}
