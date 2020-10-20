import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { ClientProductService } from 'src/app/shared/services/client-product.service';

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent implements OnInit, OnDestroy {

  public productId: string;
  public product: Product;
  private sSub: Subscription;
  private gSub: Subscription;
  private fSub: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private prodServ: ClientProductService) {
    this.sSub = this.activateRoute.params.subscribe(({ id }) => {
      this.productId = id;
    });
  }

  public ngOnInit(): void {
    window.scroll(0, 0);

    if (this.productId === 'first') {
      this.fSub = this.prodServ.getFirstProductByType({ name: 'Семена' }).subscribe((res: Product) => {
        this.product = res;
      });
    } else {
      this.loadProduct(this.productId);
    }
  }

  public loadProduct(id: string): void {
    this.getProductById(id);
  }

  private getProductById(id: string): void {
    this.gSub = this.prodServ.getProductById({ id }).subscribe((res: Product) => {
      this.product = res;
    });
  }

  public ngOnDestroy(): void {
    if (this.sSub) {
      this.sSub.unsubscribe();
    }

    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.fSub) {
      this.fSub.unsubscribe();
    }
  }

}
