import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-add-product-name',
  templateUrl: './add-product-name.component.html',
  styleUrls: ['./add-product-name.component.css']
})
export class AddProductNameComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitted = false;
  public productNames = [];
  public productTypes = [];
  public gSub: Subscription;
  public rSub: Subscription;
  public aSub: Subscription;
  public gSubSecond: Subscription;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      productType: new FormControl(null, [Validators.required])
    });
    this.getProductNames();
    this.getProductTypes();
  }

  getProductNames() {
    this.gSub = this.productServ.getProductNames().subscribe((res: any) => {
      this.productNames = [];
      res.productNames.forEach(element => {
        this.productNames = this.productNames.concat(element);
      });
    });
  }

  getProductTypes() {
    this.gSubSecond = this.productServ.getProductTypes().subscribe((res: any) => {
      this.productTypes = [];
      res.productTypes.forEach(element => {
        this.productTypes = this.productTypes.concat(element);
      });
    });
  }

  remove(id) {
    this.rSub = this.productServ.removeProductName({ id }).subscribe((res: any) => {
      this.productNames = this.productNames.filter(student => student.id !== id);
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const request = {
      name: this.form.value.name,
      productTypeId: this.form.value.productType
    };

    this.aSub = this.productServ.addProductName(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
        this.getProductNames();
      }

      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }

    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}