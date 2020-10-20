import { Component, Input } from '@angular/core';
import { Product } from '../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input()
  public product: Product | null;
}
