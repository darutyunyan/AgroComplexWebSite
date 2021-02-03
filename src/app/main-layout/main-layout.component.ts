import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnlineRequestComponent } from '../shared/dialogs/online-request/online-request.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public toHome(): void {
    this.router.navigate(['/home']);
  }

  public openOnlineRequest(): void {
    this.dialog.open(OnlineRequestComponent);
  }
}
