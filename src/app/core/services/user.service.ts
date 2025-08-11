import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/app/model/users.model';
import { UrlService } from './URL.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private url: UrlService) {}
  API_URL = this.url.apiUrl;
  getUsers(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(`${this.API_URL}/api/users`);
  }

  deleteUsersbyId(id: number) {
    return this.http.delete<void>(`${this.API_URL}/api/users/${id}`);
  }

  registerUser(user: UsersModel) {
    return this.http.post<any>(`${this.API_URL}/api/users/register`, user);
  }
}
