import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { getProductsPending } from 'src/app/store/actions/client/client.actions';
import { IGetAllItem } from 'src/app/store/models/client.model';
import { IError } from 'src/app/store/models/error';
import { IStateClient } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends UnSubscriber implements OnInit {

  public product$: Observable<IGetAllItem[]>;
  public error$: Observable<IError>;
  public loading$: Observable<boolean>;

  constructor(private store: Store<IStateClient>) {
    super();
    this.loading$ = store.select(s => s.clientState.loading);
    this.error$ = store.select(s => s.clientState.error);
    this.product$ = store.select(s => s.clientState.items);
  }

  public ngOnInit(): void {
    this.store.dispatch(getProductsPending());
  }

}
