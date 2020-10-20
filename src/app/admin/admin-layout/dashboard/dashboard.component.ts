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

  public displayedColumns: string[] = ['productName', 'info', 'type', 'columnType', 'action'];
  public dataSource: any;

  public products: any = [];
  public productName: string;
  public gSub: Subscription;
  public rSub: Subscription;
  public searchPipe: SearchPipe = new SearchPipe();

  constructor(private productServ: ProductService) { }

  public ngOnInit(): void {
    this.getAllProduct();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.searchPipe.transform(this.products, filterValue);
  }

  public remove(id: string): void {
    this.rSub = this.productServ.removeProduct({ id }).subscribe((res: any) => {
      this.products = this.products.filter(student => student.id !== id);
      this.dataSource = this.products;
    });
  }

  public getAllProduct(): void {
    this.gSub = this.productServ.getAllProducts().subscribe((res: any) => {
      this.products = [];
      res.productItems.forEach(product => {
        this.products = this.products.concat(product);
      });
      this.dataSource = new MatTableDataSource(this.products);
    });
  }

  public ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

}
