import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    let currentCategoryId: number = 1;
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    
    if (hasCategoryId) {
      let routeCategoryId: string | null = this.route.snapshot.paramMap.get('id');
      currentCategoryId = routeCategoryId == null ? 1 : +routeCategoryId;
    }

    this.productService.getProducts(currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
