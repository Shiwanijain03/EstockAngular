 
import { Component, OnInit,NgModule  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { CompanyEntity, StockEntity } from 'src/app/models/company-entity';
import { EStockService } from 'src/app/services/e-stock.service';
import { DatePipe } from '@angular/common';
import { min } from 'rxjs';
@Component({
  selector: 'app-e-stock',
  templateUrl: './e-stock.component.html',
  styleUrls: ['./e-stock.component.css']
})
export class EStockComponent implements OnInit {
  companyName = "infoys";
  isAddCompanyClick = false;
  validateForm!: FormGroup;
  allCompaniesList!: Array<CompanyEntity>;
  selectedCompany: string ="";
  searchCompanyCode: string ="";
  startValue: any;
  endValue: any;
  startDateDefault = new Date();
  stocks : Array<StockEntity> = new Array();
  minValue = 0.0;
  maxValue = 0.0;
  averageValue = "0";
  constructor(private fb: FormBuilder,
    private _estockService: EStockService,
    private router: Router,
    private _datePipe: DatePipe) {}

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  ngOnInit(): void {  

    this.getCompanyDetails();

    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      ceo: [null, [Validators.required]],
      turnover: [null, [Validators.required,Validators.min(10)]],
      website: [null, [Validators.required], this.urlAndFolderPathValidator],
      exchange: [null, [Validators.required]],
      agree: [false]
    });
  }
  getCompanyCode(){
    debugger;
    if(this.selectedCompany != null && this.selectedCompany != undefined && this.selectedCompany != '' && this.allCompaniesList != undefined){
       if(this.allCompaniesList.findIndex(x => x.Code == this.selectedCompany)> -1){
        return this.allCompaniesList.find(x => x.Code == this.selectedCompany)?.Code;
       }
    }else if(this.searchCompanyCode != null && this.searchCompanyCode != undefined && this.searchCompanyCode != '' && this.allCompaniesList != undefined){
      if(this.allCompaniesList.findIndex(x => x.Code == this.searchCompanyCode)> -1){
       return this.allCompaniesList.find(x => x.Code == this.searchCompanyCode)?.Code;
      }
   }
    return "";
  }
  getCompanyName(){
    if(this.selectedCompany != null && this.selectedCompany != undefined && this.selectedCompany != '' && this.allCompaniesList != undefined){
      if(this.allCompaniesList.findIndex(x => x.Code == this.selectedCompany)> -1){
       return this.allCompaniesList.find(x => x.Code == this.selectedCompany)?.Name;
      }
   } else if(this.searchCompanyCode != null && this.searchCompanyCode != undefined && this.searchCompanyCode != '' && this.allCompaniesList != undefined){
    if(this.allCompaniesList.findIndex(x => x.Code == this.searchCompanyCode)> -1){
     return this.allCompaniesList.find(x => x.Code == this.searchCompanyCode)?.Name;
    }
  }
   return "";
  }
  companySearchClick(){
    this.companySelectChange(true);    
  }
  companySelectChange(isSearch: boolean){
    debugger;
    const selCompCode = isSearch ? this.searchCompanyCode :  this.selectedCompany;
    if(isSearch){
      this.selectedCompany = '';
    }else{
      this.searchCompanyCode = '';
    }
    let sVAl;
    let eVal;
     if(this.startValue == null || this.startValue == undefined ){
      sVAl =  new Date("January 1, 1970 00:00:00");
     }else{
      sVAl = this.startValue;
     }

     if(this.endValue == null || this.endValue == undefined ){
      eVal =  new Date();
     }else{
      eVal = this.endValue;
     }

    const  startVal =  this._datePipe.transform(sVAl,'yyyy-MM-dd HH:mm:ss');//this.startValue == null || this.startValue == undefined ? new Date("January 1, 1970 00:00:00").toLocaleString("en-GB") :  this.startValue.toLocaleString("en-GB");
    const  endVal = this._datePipe.transform(eVal,'yyyy-MM-dd HH:mm:ss');//this.endValue == null || this.endValue == undefined ? new Date().toLocaleString("en-GB") :  this.endValue.toLocaleString("en-GB");
     this._estockService.getStocks(selCompCode,startVal,endVal).subscribe(response => {
      if(response != null && response.length >0){
        const stockEntityList : Array<StockEntity> = response;
        stockEntityList.forEach(element => {
         element.DateComponent = this._datePipe.transform(element.Date,'yyyy-MM-dd');
         element.TimeComponent = this._datePipe.transform(element.Date,'HH:mm:ss');
        });
        this.stocks = stockEntityList;
        this.minValue = this.getMinValue(stockEntityList);
        this.maxValue = this.getMaxValue(stockEntityList);
        this.averageValue = this.getAvgValue(stockEntityList);
      }else{
        this.stocks = new Array(); 
        this.minValue = 0;
        this.maxValue = 0;
        this.averageValue = "0";
      }
     })
     
  }
  getMinValue(stockEntityList: StockEntity[]): number {
    let out : number = stockEntityList[0].Price;
    stockEntityList.forEach(x => {
      if(x.Price < out){
        out = x.Price;
      }
    })
    return out;
  }
  getMaxValue(stockEntityList: StockEntity[]): number {
    let out : number = stockEntityList[0].Price;
    stockEntityList.forEach(x => {
      if(x.Price > out){
        out = x.Price;
      }
    })
    return out;
  }
  getAvgValue(stockEntityList: StockEntity[]): string {
    let out : number = 0.0;
    stockEntityList.forEach(x => {
       
        out = out + x.Price;
       
    })
    const result = out/stockEntityList.length;
    return result.toFixed(2);
  }
  getCompanyListName(option : CompanyEntity){
    return option.Name + ' (' + option.Code + ')' + '(' + option.lastStockPrice + ')';
  }
  getCompanyDetails(){
    this._estockService.getAllCompanies().subscribe(response => {
      debugger;
      this.allCompaniesList = response;       
    })
  }

  submitForm(){
    debugger;
    if(this.validateForm.valid){
     const code =  this.validateForm.get('code')?.value;
     debugger;
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  urlAndFolderPathValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value != null && control.value.length > 0) {
        if (
          !new RegExp('^(ftp|http|https)://[^ "]+$').test(control.value) &&
          !new RegExp(
            '^[a-zA-Z0-9](?:[a-zA-Z0-9 ]|(/(?!/))){0,253}[a-zA-Z0-9]$|^\\$root$'
          ).test(control.value) &&
          !new RegExp(
            '^[a-zA-Z0-9](?:[a-zA-Z0-9 ]|(\\\\(?!\\\\))){0,253}[a-zA-Z0-9]$|^\\$root$'
          ).test(control.value) &&
          !new RegExp(
            '^[a-zA-Z]:\\\\(((?![<>:"/\\\\|?*]).)+((?<![ .])\\\\)?)*$'
          ).test(control.value)
        )
          return { invalidPath: true }; 
      }
      return null;
    };
  }
  addCompany(){
    this.router.navigate(["/companyAdd"]);
    debugger;
  }
   
}
