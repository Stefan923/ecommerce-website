import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
