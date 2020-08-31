import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {
  public form: FormGroup;
  submitted = false;

  productTypes = [];

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
    this.productServ.getProductTypes().subscribe((res: any) => {
      this.productTypes = [];
      res.productTypes.forEach(element => {
        this.productTypes = this.productTypes.concat(element);
      });
    }, () => {

    });
  }

  remove(id) {
    this.productServ.removeProductType({ id: id }).subscribe((res: any) => {
      this.productTypes = this.productTypes.filter(student => student.id !== id);
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

    this.productServ.addProductType(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
        this.getProductTypes();
      }

      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
