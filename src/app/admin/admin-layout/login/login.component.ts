import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitted: any = false;
  public lSub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    if (auth.isAuthenicated()) {
      this.router.navigate(['/admin', 'dashboard']);
    }
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const request = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.lSub = this.auth.login(request).subscribe((res: any) => {

      if (res.serviceError == null) {
        if (res.token) {
          this.auth.setToken(res);
          this.router.navigate(['/admin', 'dashboard']);
        }
        this.form.reset();
      }

      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  public ngOnDestroy(): void {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }
}
