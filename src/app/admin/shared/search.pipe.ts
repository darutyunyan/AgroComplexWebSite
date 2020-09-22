import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], productName: string): any {
    if (productName == null || !productName.trim()) {
      return products;
    }

    return products.filter(product =>
      `${product.productName} ${product.productType}`.toLocaleLowerCase().includes(productName.toLocaleLowerCase()));
  }

}
