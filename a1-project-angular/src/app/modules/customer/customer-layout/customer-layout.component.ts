import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit {
  isCollapsed = false;
  testProduct = new Product();
  constructor() { }

  ngOnInit(): void {
  }

}
