import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private static readonly BASE_URL = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  getProducts(categoryId: number, page: number, pageSize: number): Observable<GetResponseProducts> {
    const url = `${ProductService.BASE_URL}/products/search/findByCategoryId`
      + `?id=${categoryId}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProductsByName(name: string, page: number, pageSize: number): Observable<GetResponseProducts> {
    const url = `${ProductService.BASE_URL}/products/search/findByNameContaining`
      + `?name=${name}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${ProductService.BASE_URL}/products/${productId}`;

    return this.httpClient.get<Product>(url);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const url = `${ProductService.BASE_URL}/product-categories`;

    return this.httpClient.get<GetResponseProductCategories>(url).pipe(
      map(response => response._embedded.productCategories)
    );
  }

}

export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategories: ProductCategory[];
  }
}
