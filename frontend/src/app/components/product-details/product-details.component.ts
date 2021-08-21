import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | null = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

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

}
