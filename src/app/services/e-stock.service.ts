import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CompanyEntity } from '../models/company-entity';
 

@Injectable({
  providedIn: 'root'
})
export class EStockService {
  
  
   url = "https://localhost:44345/api/v1.0/market/";
   REGISTER_COMPANY = "company/register";
   GET_ALL_COMPANY = "company/getall";
   GET_STOCKS = "stock/get";
  constructor(private http: HttpClient) { }
  getCompanyDetails() {
    throw new Error('Method not implemented.');
  }
  
  getStocks(selCompCode: string, startValue: string | null, endValue: string | null) {
    let getCompURL = this.url + this.GET_STOCKS;

    getCompURL = getCompURL + "?code=" + selCompCode + "&startDate=" + startValue + "&endDate=" + endValue

    let params = new HttpParams();
    // params.append("code",selCompCode);
    // params.append("startDate",startValue);
    // params.append("endDate",endValue);
    return this.http.get(getCompURL,{params}).pipe(
      tap(response => {
          console.log(response);
      }),
      catchError(err => {
        return of(err);
      })
    )
  }

  getAllCompanies(){
    let params = new HttpParams();
    const getCompURL = this.url + this.GET_ALL_COMPANY;
    return this.http.get(getCompURL,{params}).pipe(
      tap(response => {
          console.log(response);
      }),
      catchError(err => {
        return of(err);
      })
    )
  }
  saveCompany(companyEntity: CompanyEntity){
    const compURL = this.url + this.REGISTER_COMPANY;
    return this.http.post(compURL,companyEntity).pipe(
      tap(response => {
          console.log(response);
      }),
      catchError(err => {
        return of(err);
      })
    )
  }
}
