import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../shared/search.pipe';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['productName', 'info', 'type', 'columnType', 'action'];
  dataSource: any;

  public products = [];
  public productName: string;
  public gSub: Subscription;
  public rSub: Subscription;
  public searchPipe: SearchPipe = new SearchPipe();

  constructor(private productServ: ProductService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.searchPipe.transform(this.products, filterValue);
  }

  remove(id: string) {
    this.rSub = this.productServ.removeProduct({ id }).subscribe((res: any) => {
      this.products = this.products.filter(student => student.id !== id);
      this.dataSource = this.products;
    });
  }

  getAllProduct() {
    this.gSub = this.productServ.getAllProducts().subscribe((res: any) => {
      this.products = [];
      res.productItems.forEach(product => {
        this.products = this.products.concat(product);
      });
      this.dataSource = new MatTableDataSource(this.products);
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
