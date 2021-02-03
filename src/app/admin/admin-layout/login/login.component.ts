import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { loginPending } from 'src/app/store/actions/admin/account.action';
import { ILoginResponse } from 'src/app/store/models/admins.model';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends UnSubscriber implements OnInit {

  public form: FormGroup;
  public loginResponse$: Observable<ILoginResponse>;

  constructor(
    private store: Store<IAdminState>,
    private auth: AuthService,
    private router: Router
  ) {
    super();
    this.loginResponse$ = store.select(s => s.adminState.accountState.loginResponse);
    if (auth.isAuthenicated()) {
      this.router.navigate(['/admin', 'dashboard']);
    }
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

    this.loginResponse$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((response: ILoginResponse) => {
        if (response != null && response.error == null) {
          this.auth.setToken(response);
          this.router.navigate(['/admin', 'dashboard']);
        }
      });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(loginPending({ email: this.form.value.email, password: this.form.value.password }));
    this.form.reset();
  }
}
