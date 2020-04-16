import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductExchangeService } from 'src/app/services/product-exchange.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css'],
  providers: [ProductExchangeService]
})
export class CustomerLayoutComponent implements OnInit {
  testProduct = new Product('Test', '#00FF00');
  isCollapsed = false;

constructor(private productService: ProductExchangeService) { }

ngOnInit(): void {
  this.send(this.testProduct);
  }


  send(product: Product){

    this.productService.sendProduct(product);
   // this.emitter.emit(this.testProduct);
    console.log('sent');
  }
}
