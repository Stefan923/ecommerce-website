import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
    }

    if (existingCartItem != undefined) {
      existingCartItem.quantity = existingCartItem.quantity + 1;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartItem of this.cartItems) {
       totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
       totalQuantityValue += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

}
