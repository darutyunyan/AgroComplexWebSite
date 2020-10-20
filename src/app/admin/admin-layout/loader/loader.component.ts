import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  public isShow: boolean;

  constructor(private productServ: ProductService) {
  }

  public ngOnInit(): void {
    this.productServ.getLoaderStatus().subscribe((value) => {
      this.isShow = value;
    });
  }

}
