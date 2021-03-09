import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { getProductByIdPending } from 'src/app/store/actions/client/client.actions';
import { IGetProductByIdResponse } from 'src/app/store/models/client.model';
import { IError } from 'src/app/store/models/error';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends UnSubscriber implements OnInit {

  public loading$: Observable<boolean>;
  public product$: Observable<IGetProductByIdResponse>;
  public error$: Observable<IError>;

  constructor(
    private store: Store<IClientState>,
    private activateRoute: ActivatedRoute,
    private router: Router) {
    super();
    this.loading$ = this.store.select(s => s.clientState.productById.loading);
    this.product$ = this.store.select(s => s.clientState.productById);
    this.error$ = this.store.select(s => s.clientState.error);
  }

  public ngOnInit(): void {
    this.activateRoute.params
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe(({ id }) => {
        if (id !== 'first') {
          this.store.dispatch(getProductByIdPending({ id }));
        } else {
          this.store.select(s => s.clientState.products?.items)
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe(response => {
              if (response && response.length > 0 && response[0].items && response[0].items[0]?.id) {
                this.router.navigate(['/products', response[0].items[0].id]);
              }
            });
        }

        document.querySelector('mat-sidenav-content').scrollTop = 0;
      });
  }

}
