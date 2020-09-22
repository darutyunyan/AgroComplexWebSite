import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitted = false;
  public productTypes = [];
  public gSub: Subscription;
  public rSub: Subscription;
  public aSub: Subscription;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
    this.getProductTypes();
  }

  getProductTypes() {
    this.gSub = this.productServ.getProductTypes().subscribe((res: any) => {
      this.productTypes = [];
      res.productTypes.forEach(element => {
        this.productTypes = this.productTypes.concat(element);
      });
    });
  }

  remove(id) {
    this.rSub = this.productServ.removeProductType({ id }).subscribe((res: any) => {
      this.productTypes = this.productTypes.filter(student => student.id !== id);
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const request = {
      name: this.form.value.name
    };

    this.aSub = this.productServ.addProductType(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
        this.getProductTypes();
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
