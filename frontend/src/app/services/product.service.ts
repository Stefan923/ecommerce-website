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

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(ProductService.BASE_URL).pipe(
      map(response => response._embedded.products)
    );
  }

}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
