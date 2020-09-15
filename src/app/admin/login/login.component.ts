import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    if (auth.isAuthenicated()) {
      this.router.navigate(['/admin', 'dashboard']);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const request = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        if (res.token) {
          this.auth.setToken(res);
          this.router.navigate(['/admin', 'dashboard']);
        }
        this.form.reset();
      }

      this.submitted = false;
    }, (error) => {
      this.submitted = false;
    });
  }
}