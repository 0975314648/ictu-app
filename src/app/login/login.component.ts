import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private apiService: ApiService) { }

  onLogin() {
    const body = {
      "userName": this.username,
      "password": this.password
    }
    this.apiService.postLogin(body).subscribe(res => {
      if (res && res.errorCode === 1) {
        alert('Login thất bại: ' + res.errorMessage);
      } else {
        localStorage?.setItem('token', res.data.accessToken);
        this.router.navigate(['/home']);
      }
    });
  }
}
