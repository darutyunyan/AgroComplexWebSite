import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-column-type',
  templateUrl: './add-column-type.component.html',
  styleUrls: ['./add-column-type.component.css']
})
export class AddColumnTypeComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitted = false;
  public tables = [];
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
    this.getColumnTypes();
  }

  getColumnTypes() {
    this.gSub = this.productServ.getColumnTypes().subscribe((res: any) => {
      this.tables = [];
      res.columnTypes.forEach(element => {
        this.tables = this.tables.concat(element);
      });
    }, () => {

    });
  }

  remove(id: string) {
    this.rSub = this.productServ.removeColumnType({ id }).subscribe((res: any) => {
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

    this.aSub = this.productServ.addColumnType(request).subscribe((res: any) => {
      if (res.serviceError == null) {
        this.form.reset();
        this.getColumnTypes();
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
