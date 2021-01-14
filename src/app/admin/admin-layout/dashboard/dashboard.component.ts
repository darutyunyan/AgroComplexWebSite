import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { clearProductError, getProductsPending } from 'src/app/store/actions/admin/product.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IProductItem } from 'src/app/store/models/admins.model';
import { IError } from 'src/app/store/models/error';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends UnSubscriber implements OnInit {

  public products$: Observable<IProductItem[]>;
  public error$: Observable<IError>;
  public loaded$: Observable<boolean>;

  constructor(private store: Store<IAdminState>) {
    super();
    this.products$ = store.select(s => s.adminState.productState.items);
    this.error$ = store.select(s => s.adminState.productState.error);
    this.loaded$ = store.select(s => s.adminState.productState.loaded);
  }

  public ngOnInit(): void {
    this.error$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((error: IError) => {
        if (error != null) {
          this.store.dispatch(clearProductError());
          this.store.dispatch(showMessage(
            {
              messageData: {
                statusCode: error.statusCode,
                message: error.message
              }
            }));
        }
      });

    this.store.dispatch(getProductsPending());
  }

}
