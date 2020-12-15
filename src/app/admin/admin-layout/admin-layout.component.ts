import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { IState } from 'src/app/store';
import { IMessageData } from 'src/app/store/models/message.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  public message$: Observable<IMessageData> = this.store.select(store => store.messageData);

  constructor(
    private store: Store<IState>,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.message$.subscribe((data: IMessageData) => {
      this.showMessage(data);
    });
  }

  public isAuthenicated(): boolean {
    return this.auth.isAuthenicated();
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  public showMessage(data: IMessageData) {
    if (data.statusCode != null) {
      const dialogConfig = new MatDialogConfig<IMessageData>();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '400px';

      dialogConfig.data = data;

      this.dialog.open(ErrorComponent, dialogConfig);
    }
  }

  
}
