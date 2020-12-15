import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { IState } from 'src/app/store';
import { addProductTypePending, getProductTypesPending, removeProductTypePending } from 'src/app/store/actions/admins.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IProductType } from 'src/app/store/models/admins.model';
import { IError } from 'src/app/store/models/error';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  public form: FormGroup;
  public products$: Observable<IProductType[]>;
  public loaded$: Observable<boolean>;
  public error$: Observable<IError>;
  public successOperation$: Observable<boolean>;

  constructor(private store: Store<IState>) {
    this.products$ = this.store.select(store => store.productTypesResponse.productTypes);
    this.loaded$ = this.store.select(store => store.productTypesResponse.loaded);
    this.error$ = this.store.select(store => store.productTypesResponse.error);
    this.successOperation$ = this.store.select(store => store.productTypesResponse.successOperation);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.store.dispatch(getProductTypesPending());

    this.successOperation$.subscribe((success) => {
      if (success) {
        this.store.dispatch(showMessage({
          messageData: {
            statusCode: ErrorComponent.SUCCESS_OPERATION,
            message: null
          }
        }))
      }
    });

    this.error$.subscribe((error: IError) => {
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
}
