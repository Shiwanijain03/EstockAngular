import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { CompanyEntity } from 'src/app/models/company-entity';
import { EStockService } from 'src/app/services/e-stock.service';
import { ModalPopupService } from 'src/app/services/modal-popup.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private _estockService: EStockService,
    private _modalPopUpService: ModalPopupService,
    private _location: Location,
    private _datePipe: DatePipe) {}

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  navigateBack(){
    this._location.back();
  }
  ngOnInit(): void {  
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      ceo: [null, [Validators.required]],
      turnover: [null, [Validators.required,Validators.min(10)]],
      website: [null, [Validators.required]],
      exchange: [null, [Validators.required]],
      agree: [false]
    });
  }
  submitForm(){
    debugger;
    if(this.validateForm.valid){
      const companyEntity: CompanyEntity = new CompanyEntity();
      companyEntity.Code=  this.validateForm.get('code')?.value;
      companyEntity.Name = this.validateForm.get('name')?.value;
      companyEntity.CEO = this.validateForm.get('ceo')?.value;
      companyEntity.TurnOver = this.validateForm.get('turnover')?.value;
      companyEntity.Website = this.validateForm.get('website')?.value;
      companyEntity.StockType = this.validateForm.get('exchange')?.value;
      
      this._estockService.saveCompany(companyEntity).subscribe(response => {
        if(response.Result == 'Success'){
          this._modalPopUpService.success(response.Message,() => {

          });
        }else{
          this._modalPopUpService.error(response.Message);
        }
      })
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

}
