import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IState } from 'src/app/store';
import { addProductTypePending, clearProductTypeError, getProductTypesPending, removeProductTypePending } from 'src/app/store/actions/admin/productType.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { ITypeItem } from 'src/app/store/models/admins.model';
import { IError } from 'src/app/store/models/error';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent extends UnSubscriber implements OnInit {
  public items$: Observable<ITypeItem[]>;
  public loaded$: Observable<boolean>;
  public error$: Observable<IError>;
  public successOperation$: Observable<boolean>;
  public form: FormGroup;

  constructor(private store: Store<IState>) {
    super();
    this.items$ = this.store.select(s => s.productTypeState.items);
    this.loaded$ = this.store.select(s => s.productTypeState.loaded);
    this.error$ = this.store.select(s => s.productTypeState.error);
    this.successOperation$ = this.store.select(s => s.productTypeState.successOperation);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

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

    this.error$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((error: IError) => {
      if (error != null) {
        this.store.dispatch(clearProductTypeError());
        this.store.dispatch(showMessage(
          {
            messageData: {
              statusCode: error.statusCode,
              message: error.message
            }
          }));
      }
    });

    this.store.dispatch(getProductTypesPending());
  }

  public remove(id): void {
    this.store.dispatch(removeProductTypePending({ id }));
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addProductTypePending({ name: this.form.value.name }));
    this.form.reset();
  }
}
