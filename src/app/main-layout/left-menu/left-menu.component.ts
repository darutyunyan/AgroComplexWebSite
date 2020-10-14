import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/shared/interfaces';
import { ClientProductService } from 'src/app/shared/services/client-product.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit, OnDestroy {

  @Input()
  public productType: string;

  @Output() loadNewProduct = new EventEmitter<string>();

  public items: Item[] = [];
  public lSub: Subscription;

  constructor(private prodServ: ClientProductService,
    private router: Router) {

  }

  public ngOnInit(): void {
    this.lSub = this.prodServ.getProductNamesByType({ ProductType: this.productType }).subscribe((res: any) => {
      this.items = [];
      res.items.forEach((element: Item) => {
        this.items = this.items.concat(element);
      });
    });
  }

  public loadProduct(id): void {
    if (this.productType === 'Семена') {
      this.router.navigate(['/seeds', id]);
    } else {
      this.router.navigate(['/cropProtaction', id]);
    }
    this.loadNewProduct.emit(id);
  }

  ngOnDestroy(): void {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }
}
