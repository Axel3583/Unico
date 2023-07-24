import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  errorMessage: string | null = "";

  constructor(private apiService: ApiService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((data) => {
          if (data.username === this.loginForm.value.username && data.password === this.loginForm.value.password) {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
          } else {
            this.errorMessage = "Identifiant non valide"
          }
        },
        error => {
          console.error(error);
          this.errorMessage = error;
        }
      );
    }
  }
  
}
