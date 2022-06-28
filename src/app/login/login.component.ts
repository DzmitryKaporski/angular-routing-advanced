import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: string = 'admin'
  userPassword: string = '123'
  message!: string

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setMessage()
  }

  login(): void {
    this.authService.login(this.userLogin, this.userPassword).subscribe((res: boolean) => {
      this.setMessage()

      if (!this.authService.isLoggedIn) return

      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin'
      this.router.navigate([redirect])
    })

  }

  logout(): void {
    this.authService.logout()
  }

  private setMessage(): void {
    this.message = `Logged  ${this.authService.isLoggedIn ? 'in' : 'out'}`
  }
}
