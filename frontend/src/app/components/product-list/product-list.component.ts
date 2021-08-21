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
    const searchMode: boolean = this.route.snapshot.paramMap.has('keyword');
    
    if (searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    let keyword: string | null = "";
    
    const routeKeyword: string | null = this.route.snapshot.paramMap.get('keyword');
    keyword = routeKeyword == null ? keyword : routeKeyword;

    this.productService.getProductsByName(keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts() {
    let categoryId: number = 1;
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    
    if (hasCategoryId) {
      let routeCategoryId: string | null = this.route.snapshot.paramMap.get('id');
      categoryId = routeCategoryId == null ? 1 : +routeCategoryId;
    }

    this.productService.getProducts(categoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

}
