import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-column-type',
  templateUrl: './add-column-type.component.html',
  styleUrls: ['./add-column-type.component.css']
})
export class AddColumnTypeComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  tables = [];

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
    this.getColumnTypes();
  }

  getColumnTypes() {
    this.productServ.getColumnTypes().subscribe((res: any) => {
      this.tables = [];
      res.columnTypes.forEach(element => {
        this.tables = this.tables.concat(element);
      });
    }, () => {

    });
  }

  remove(id) {
    this.productServ.removeColumnType({ id }).subscribe((res: any) => {
      this.tables = this.tables.filter(student => student.id !== id);
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

    this.productServ.addColumnType(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
        this.getColumnTypes();
      }

      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
