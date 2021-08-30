import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';

@Injectable({
  providedIn: 'root'
})
export class FromService {

  private static readonly BASE_URL = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  getAddressCountries(): Observable<Country[]> {
    const url: string = `${ FromService.BASE_URL }/country`;

    return this.httpClient.get<GetResponseCountries>(url).pipe(
      map(response => response._embedded.countries)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}
