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
      existingCartItem = this.cartItems.find(
        tempCartItem => tempCartItem.id === cartItem.id
      );
    }

    if (existingCartItem != undefined) {
      existingCartItem.quantity = existingCartItem.quantity + 1;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  removeFromCart(cartItem: CartItem) {
    if (this.cartItems.length > 0) {
      const itemIndex = this.cartItems.findIndex(
        tempCartItem => tempCartItem.id === cartItem.id
      );

      if (itemIndex > -1) {
        this.cartItems.splice(itemIndex, 1);
        this.computeCartTotals();
      }
    }
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.computeCartTotals();
    }
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
