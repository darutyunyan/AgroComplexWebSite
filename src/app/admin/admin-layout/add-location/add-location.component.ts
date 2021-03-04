import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { YaEvent } from 'angular8-yandex-maps';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/templates/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { showMessage } from 'src/app/store/actions/message.action';
import { addOrUpdateLocationPending, getLocationPending } from 'src/app/store/actions/shared/location.action';
import { ICoordinates } from 'src/app/store/models/client.model';
import { IError } from 'src/app/store/models/error';
import { IAdminState } from 'src/app/store/reducers/admin';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent extends UnSubscriber implements OnInit {

  public form: FormGroup;

  public coordinates$: Observable<ICoordinates>;
  public loading$: Observable<boolean>;
  public error$: Observable<IError>;
  public successOperation$: Observable<boolean>;

  constructor(private store: Store<IAdminState>) {
    super();
    this.loading$ = this.store.select(s => s.adminState.locationState.loading);
    this.error$ = this.store.select(s => s.adminState.locationState.error);
    this.coordinates$ = this.store.select(s => s.adminState.locationState.coordinates);
    this.successOperation$ = store.select(s => s.adminState.locationState.successOperation);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      lat: new FormControl(null, [Validators.required]),
      lng: new FormControl(null, [Validators.required]),
    });

    this.store.dispatch(getLocationPending());

    this.coordinates$
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((coordiantes: ICoordinates) => {
        if (coordiantes.lat && coordiantes.lng) {
          this.form.setValue({ lat: coordiantes.lat, lng: coordiantes.lng });
        }
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
  }

  public leftClick(yaEvent: YaEvent): void {
    if (yaEvent && yaEvent.event) {
      const coords = yaEvent.event.get('coords');
      this.form.setValue({ lat: coords[0], lng: coords[1] });
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addOrUpdateLocationPending({
      lat: this.form.value.lat.toString(),
      lng: this.form.value.lng.toString()
    }));
  }
}
