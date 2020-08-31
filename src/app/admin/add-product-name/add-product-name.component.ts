import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-product-name',
  templateUrl: './add-product-name.component.html',
  styleUrls: ['./add-product-name.component.css']
})
export class AddProductNameComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  productNames = [];

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
    this.getProductNames();
  }

  
  getProductNames() {
    this.productServ.getProductNames().subscribe((res: any) => {
      this.productNames = [];
      res.productNames.forEach(element => {
        this.productNames = this.productNames.concat(element);
      });
    }, () => {

    });
  }

  remove(id) {
    this.productServ.removeProductName({ id: id }).subscribe((res: any) => {
      this.productNames = this.productNames.filter(student => student.id !== id);
    }, () => {

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

    this.productServ.addProductName(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
        this.getProductNames();
      }

      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
