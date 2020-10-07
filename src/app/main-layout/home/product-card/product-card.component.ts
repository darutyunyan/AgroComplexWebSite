
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public name: string;

  @Input()
  public isSeeds: string;

  @Input()
  public productId: string;

  constructor(private route: Router) { }

  ngOnInit(): void {

  }

  goToProduct(): void {
    this.route.navigate(['/seeds', this.productId]);
  }

}
