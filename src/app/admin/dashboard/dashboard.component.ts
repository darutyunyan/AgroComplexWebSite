import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public products = [];

  constructor(private productServ: ProductService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productServ.getAllProducts().subscribe((res: any) => {
      this.products = [];
      res.productItems.forEach(product => {
        this.products = this.products.concat(product);
      });
    }, () => {

    });
  }

}
