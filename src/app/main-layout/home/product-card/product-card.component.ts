
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  public name: string;

  @Input()
  public typeName: string;

  @Input()
  public productId: string;

  constructor(private route: Router) { }

  public getIcon(): string {
    switch (this.typeName) {
      case 'Семена':
        return 'fa-leaf';

      case 'СЗР':
        return 'fa-shield';

      case 'Мин. удобрения':
        return 'fa-product-hunt';

      case 'Корма':
        return 'fa-product-hunt';
    }
  }

  public goToProduct(): void {
    switch (this.typeName) {
      case 'Семена':
        this.route.navigate(['/seeds', this.productId]);
        break;

      case 'СЗР':
        this.route.navigate(['/cropProtaction', this.productId]);
        break;

      case 'Мин. удобрения':
        break;
      case 'Корма':
        break;
    }
  }

}
