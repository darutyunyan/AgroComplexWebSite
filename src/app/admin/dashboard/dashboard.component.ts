import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public products = [];
  public productName: string;
  public gSub: Subscription;
  public rSub: Subscription;

  constructor(private productServ: ProductService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  remove(id: string) {
    this.rSub = this.productServ.removeProduct({ id }).subscribe((res: any) => {
      this.products = this.products.filter(student => student.id !== id);
    }, () => {

    });
  }

  getAllProduct() {
    this.gSub = this.productServ.getAllProducts().subscribe((res: any) => {
      this.products = [];
      res.productItems.forEach(product => {
        this.products = this.products.concat(product);
      });
    }, () => {

    });
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

}
