import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private static readonly BASE_URL = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) { }

  getProducts(categoryId: number): Observable<Product[]> {
    const url = `${ ProductService.BASE_URL }/search/findByCategoryId?id=${ categoryId }`;

    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }

}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
