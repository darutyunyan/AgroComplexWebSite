import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { removeProductPending } from 'src/app/store/actions/admin/product.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IProductItem } from 'src/app/store/models/admins.model';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent extends UnSubscriber implements OnInit {
  @Input()
  public products: IProductItem[];

  public productName: string;
  public successOperation$: Observable<boolean>;

  constructor(private store: Store<IAdminState>) {
    super();
    this.successOperation$ = store.select(s => s.adminState.productState.successOperation);
  }

  public ngOnInit(): void {
    this.successOperation$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((success) => {
        if (success) {
          this.store.dispatch(showMessage({
            messageData: {
              statusCode: ErrorComponent.SUCCESS_OPERATION
            }
          }));
        }
      });
  }

  public remove(id): void {
    this.store.dispatch(removeProductPending({ id }));
  }
}
