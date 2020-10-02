import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  public isShow;

  constructor(private productServ: ProductService) {
  }

  ngOnInit() {
    this.productServ.getLoaderStatus().subscribe((value) => {
      this.isShow = value;
    });
  }

}
