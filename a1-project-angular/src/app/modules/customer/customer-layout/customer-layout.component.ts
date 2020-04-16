import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subject } from 'rxjs';
import { ProductExchangeService } from 'src/app/services/product-exchange.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css'],
  providers: [ProductExchangeService]
})
export class CustomerLayoutComponent implements OnInit {
isCollapsed = false;
testProduct = new Product('Test', '#00FF00');

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
