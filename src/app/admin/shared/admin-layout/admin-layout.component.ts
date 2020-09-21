import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  isAuthenicated() {
    return this.auth.isAuthenicated();
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
