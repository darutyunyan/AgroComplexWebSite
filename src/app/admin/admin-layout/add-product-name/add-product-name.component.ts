import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IState } from 'src/app/store';
import { addProductNamePending, getProductNamesPending, removeProductNamePending } from 'src/app/store/actions/admin/productName.action';
import { clearProductTypeError, getProductTypesPending } from 'src/app/store/actions/admin/productType.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { INameItem, ITypeItem } from 'src/app/store/models/admins.model';
import { IError } from 'src/app/store/models/error';

@Component({
  selector: 'app-add-product-name',
  templateUrl: './add-product-name.component.html',
  styleUrls: ['./add-product-name.component.css']
})
export class AddProductNameComponent extends UnSubscriber implements OnInit, OnDestroy {

  public items$: Observable<INameItem[]>;
  public types$: Observable<ITypeItem[]>;
  public loaded$: Observable<boolean>;
  public typeLoaded$: Observable<boolean>;
  public error$: Observable<IError>;
  public errorProductType$: Observable<IError>;
  public successOperation$: Observable<boolean>;
  public form: FormGroup;
  public searchItem: string;

  constructor(private store: Store<IState>) {
    super();
    this.items$ = this.store.select(s => s.productNameState.items);
    this.loaded$ = this.store.select(s => s.productNameState.loaded);
    this.error$ = this.store.select(s => s.productNameState.error);
    this.successOperation$ = this.store.select(s => s.productNameState.successOperation);

    this.types$ = this.store.select(s => s.productTypeState.items);
    this.typeLoaded$ = this.store.select(s => s.productTypeState.loaded);
    this.errorProductType$ = this.store.select(s => s.productTypeState.error);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      productType: new FormControl(null, [Validators.required])
    });

    this.successOperation$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((success) => {
        if (success) {
          this.store.dispatch(showMessage({
            messageData: {
              statusCode: ErrorComponent.SUCCESS_OPERATION,
              message: null
            }
          }));
        }
      });

    this.error$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((error: IError) => {
        if (error != null) {
          this.store.dispatch(showMessage(
            {
              messageData: {
                statusCode: error.statusCode
              }
            }));
        }
      });

    this.errorProductType$
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
            }
          ));
        }
      });

    this.store.dispatch(getProductNamesPending());
    this.store.dispatch(getProductTypesPending());
  }

  public remove(id): void {
    this.store.dispatch(removeProductNamePending({ id }));
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addProductNamePending({
      name: this.form.value.name,
      typeId: this.form.value.productType
    }));

    this.form.reset();
  }
}
