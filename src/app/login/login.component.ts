import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  constructor(private service: ServiceService, private router: Router) {}

  loginForm: any;
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  errorMessage = '';

  /**
   * Method to initiate created form
   */
  ngOnInit(): void {
    this.formCreation();
  }

  /**
   * Method to create form with validations
   */
  formCreation() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  /**
   * Method to initiate login
   */
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email.trim();
    const pass = this.loginForm.value.password.trim();
    this.service.login(email, pass).subscribe({
      next: (resdata: any) => {
        this.errorMessage = '';
        localStorage.setItem('userData', JSON.stringify(resdata.data));
        this.router.navigate(['/dashboard']);
        this.loginForm.reset();
      },
      error: (err) => {
        console.log(err);
        if (err?.error?.message) {
          this.errorMessage = 'Incorrect email address or password.';
        }
      },
    });
  }
}
