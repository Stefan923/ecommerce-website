import { Component, OnInit } from '@angular/core';
import { GetResponseProducts, ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  page: number = 1;
  pageSize: number = 20;
  totalElements: number = 0;

  previousCategoryId: number = 1;

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

    this.page = 1;
    this.productService.getProductsByName(keyword, this.page - 1, this.pageSize).subscribe(this.processServiceResult);
  }

  handleListProducts() {
    let categoryId: number = 1;
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      let routeCategoryId: string | null = this.route.snapshot.paramMap.get('id');
      categoryId = routeCategoryId == null ? 1 : +routeCategoryId;
    }

    if (this.previousCategoryId != categoryId) {
      this.previousCategoryId = categoryId;
      this.page = 1;
    }

    this.productService.getProducts(categoryId, this.page - 1, this.pageSize).subscribe(this.processServiceResult());
  }

  setPageSize(pageSize: number): void {
    this.page = 1;
    this.pageSize = pageSize;
    this.listProducts();
  }

  private processServiceResult() {
    return (data: GetResponseProducts): void => {
      this.products = data._embedded.products;
      this.page = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

}
