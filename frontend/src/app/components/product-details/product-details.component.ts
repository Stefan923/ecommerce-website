import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined = undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    let productId: number = 1;
    const hasProductId = this.route.snapshot.paramMap.has('id');

    if (hasProductId) {
      const routeProductId: string | null = this.route.snapshot.paramMap.get('id');
      productId = routeProductId == null ? 1 : +routeProductId;
    }

    this.productService.getProductById(productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart() {
    if (this.product != undefined) {
      this.cartService.addToCart(new CartItem(this.product));
    }
  }

}
