import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { IState } from 'src/app/store';
import { addProductTypePending, getProductTypesPending, removeProductTypePending } from 'src/app/store/actions/admin/productType.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { ITypeItem } from 'src/app/store/models/admins.model';
import { IError } from 'src/app/store/models/error';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit, OnDestroy {
  public items$: Observable<ITypeItem[]>;
  public loaded$: Observable<boolean>;
  public error$: Observable<IError>;
  public successOperation$: Observable<boolean>;
  public form: FormGroup;
  public errorSub: Subscription;
  public successSub: Subscription;

  constructor(private store: Store<IState>) {
    this.items$ = this.store.select(s => s.productTypeState.items);
    this.loaded$ = this.store.select(s => s.productTypeState.loaded);
    this.error$ = this.store.select(s => s.productTypeState.error);
    this.successOperation$ = this.store.select(s => s.productTypeState.successOperation);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.store.dispatch(getProductTypesPending());

    this.successSub = this.successOperation$.subscribe((success) => {
      if (success) {
        this.store.dispatch(showMessage({
          messageData: {
            statusCode: ErrorComponent.SUCCESS_OPERATION,
            message: null
          }
        }));
      }
    });

    this.errorSub = this.error$.subscribe((error: IError) => {
      if (error != null) {
        this.store.dispatch(showMessage(
          {
            messageData: {
              statusCode: error.statusCode,
              message: error.message
            }
          }));
      }
    });
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

  public ngOnDestroy(): void {
    if (this.successSub) {
      this.successSub.unsubscribe();
    }

    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
