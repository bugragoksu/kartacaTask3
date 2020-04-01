import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiservice: ApiService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    console.log('submitted value', this.loginForm.value);
    // This is the time for integrete the login
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.apiservice.authenticate(username, password).subscribe(
      result => {
        // Here we are storing the token and refresh token in the localstorage
        localStorage.setItem('token', result['access']);
        localStorage.setItem('refresh', result['refresh']);
        localStorage.setItem('userId',result['user']);
        this.router.navigate(['/home']);
      },

      error => {
        console.log('error');
      }
    );

  }
}
