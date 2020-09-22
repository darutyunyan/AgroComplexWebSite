import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitted = false;
  public isShowError = false;
  public columns = [];
  public productNames = [];

  public iSub: Subscription;
  public aSub: Subscription;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      info: new FormControl(null, [Validators.required]),
      productName: new FormControl(null, [Validators.required]),
      columnType: new FormControl(null, [Validators.required])
    });

    this.init();
  }

  init() {
    this.iSub = this.productServ.initAddProduct().subscribe((res: any) => {
      res.columnTypes.forEach(element => {
        this.columns = this.columns.concat(element);
      });

      res.productNames.forEach(element => {
        this.productNames = this.productNames.concat(element);
      });

      if (this.columns.length === 0 || this.productNames.length === 0) {
        this.isShowError = true;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const request = {
      info: this.form.value.info,
      productNameId: this.form.value.productName,
      columnTypeId: this.form.value.columnType
    };

    this.aSub = this.productServ.addProduct(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
      }

      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  ngOnDestroy() {
    if (this.iSub) {
      this.iSub.unsubscribe();
    }

    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
