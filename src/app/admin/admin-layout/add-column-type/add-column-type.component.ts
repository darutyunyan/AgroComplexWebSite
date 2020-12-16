import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { IState } from 'src/app/store';
import { addColumnTypePending, getColumnTypePending, removeColumnTypePending } from 'src/app/store/actions/admin/columnType.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IItem } from 'src/app/store/models/admins.model';
import { IError } from 'src/app/store/models/error';

@Component({
  selector: 'app-add-column-type',
  templateUrl: './add-column-type.component.html',
  styleUrls: ['./add-column-type.component.css']
})
export class AddColumnTypeComponent implements OnInit, OnDestroy {

  public types$: Observable<IItem[]>;
  public loaded$: Observable<boolean>;
  public error$: Observable<IError>;
  public successOperation$: Observable<boolean>;
  public form: FormGroup;
  public errorSub: Subscription;
  public successSub: Subscription;

  constructor(private store: Store<IState>) {
    this.types$ = this.store.select(store => store.columnTypeState.types);
    this.loaded$ = this.store.select(store => store.columnTypeState.loaded);
    this.error$ = this.store.select(store => store.columnTypeState.error);
    this.successOperation$ = this.store.select(store => store.columnTypeState.successOperation);
  }


  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.store.dispatch(getColumnTypePending());

    this.successSub = this.successOperation$.subscribe((success) => {
      console.log(success)
      if (success) {
        this.store.dispatch(showMessage({
          messageData: {
            statusCode: ErrorComponent.SUCCESS_OPERATION,
            message: null
          }
        }))
      }
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
    });
  }
  public remove(id): void {
    this.store.dispatch(removeColumnTypePending({ id }));
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }


    this.store.dispatch(addColumnTypePending({ name: this.form.value.name }));
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
