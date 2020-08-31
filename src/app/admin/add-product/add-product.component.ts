import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public form: FormGroup;
  submitted = false;

  columns = [];
  productNames = [];
  productTypes = [];

  qwe: any = null;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      info: new FormControl(null, [Validators.required]),
      productType: new FormControl(null, [Validators.required]),
      productName: new FormControl(null, [Validators.required]),
      columnType: new FormControl(null, [Validators.required])
    });
    this.init();
  }

  init() {
    this.productServ.initAddProduct().subscribe((res: any) => {
      console.log(res)
      res.columnTypes.forEach(element => {
        this.columns = this.columns.concat(element);
      });

      res.productNames.forEach(element => {
        this.productNames = this.productNames.concat(element);
      });

      res.productTypes.forEach(element => {
        this.productTypes = this.productTypes.concat(element);
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
      info: this.form.value.info,
      productTypeId: this.form.value.productType,
      productNameId: this.form.value.productName,
      columnTypeId: this.form.value.columnType
    };

   /*  this.productServ.addProductName(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
        //this.getProductNames();
      }

      this.submitted = false;
    }, () => {
      this.submitted = false;
    }); */
  }
}
