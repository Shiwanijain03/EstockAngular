import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EStockComponent } from './components/e-stock/e-stock.component';
import { CompanyAddComponent } from './components/company-add/company-add.component';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DatePipe } from '@angular/common';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    EStockComponent,
    CompanyAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule ,
    NzSelectModule,
    NzDatePickerModule,
    NzTableModule,
    NzCardModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
