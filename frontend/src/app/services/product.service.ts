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

  getProducts(categoryId: number): Observable<Product[]> {
    const url = `${ProductService.BASE_URL}/products/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${ProductService.BASE_URL}/products/${productId}`;

    return this.httpClient.get<Product>(url);
  }

  getProductsByName(name: string): Observable<Product[]> {
    const url = `${ProductService.BASE_URL}/products/search/findByNameContaining?name=${name}`;

    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const url = `${ProductService.BASE_URL}/product-categories`;

    return this.httpClient.get<GetResponseProductCategories>(url).pipe(
      map(response => response._embedded.productCategories)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategories: ProductCategory[];
  }
}
