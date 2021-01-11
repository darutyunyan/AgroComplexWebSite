import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IState } from 'src/app/store';
import { clearColumnTypeError, getColumnTypePending } from 'src/app/store/actions/admin/columnType.action';
import { addProductPending, clearProductError } from 'src/app/store/actions/admin/product.action';
import { clearProductNameError, getProductNamesPending } from 'src/app/store/actions/admin/productName.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { INameItem, ITypeItem } from 'src/app/store/models/admins.model';
import { IError } from 'src/app/store/models/error';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent extends UnSubscriber implements OnInit {

  public error$: Observable<IError>;
  public successOperation$: Observable<boolean>;

  public names$: Observable<INameItem[]>;
  public namesLoaded$: Observable<boolean>;
  public errorProductName$: Observable<IError>;

  public columns$: Observable<ITypeItem[]>;
  public columnsLoaded$: Observable<boolean>;
  public errorColumnError$: Observable<IError>;

  public form: FormGroup;

  constructor(private store: Store<IState>) {
    super();
    this.error$ = store.select(s => s.productState.error);
    this.successOperation$ = store.select(s => s.productState.successOperation);

    this.names$ = store.select(s => s.productNameState.items);
    this.namesLoaded$ = store.select(s => s.productNameState.loaded);
    this.errorProductName$ = store.select(s => s.productNameState.error);

    this.columns$ = store.select(s => s.columnTypeState.items);
    this.columnsLoaded$ = store.select(s => s.columnTypeState.loaded);
    this.errorColumnError$ = store.select(s => s.columnTypeState.error);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      info: new FormControl(null, [Validators.required]),
      productName: new FormControl(null, [Validators.required]),
      columnType: new FormControl(null, [Validators.required])
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

    this.errorColumnError$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((error: IError) => {
        if (error != null) {
          this.store.dispatch(clearColumnTypeError());
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

    this.errorProductName$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((error: IError) => {
        if (error != null) {
          this.store.dispatch(clearProductNameError());
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
    this.store.dispatch(getColumnTypePending());
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addProductPending({
      info: this.form.value.info,
      productNameId: this.form.value.productName,
      columnTypeId: this.form.value.columnType
    }));

    this.form.controls.info.reset();
  }

}
