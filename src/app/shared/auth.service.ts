import { Injectable } from '@angular/core';
import { of, delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false
  redirectUrl!: string

  constructor() { }

  login(login: string, password: string): Observable<boolean> {

    const observable = of({
      login: 'admin',
      password: '123',
    }).pipe(delay(2000))

    return observable.pipe(map(res => {
      console.log(res)
      return login === res.login && res.password === '123' ? this.isLoggedIn = true : false
    }))
  }

  logout(): any {
    this.isLoggedIn = false
  }
}
