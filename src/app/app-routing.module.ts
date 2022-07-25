import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAddComponent } from './components/company-add/company-add.component';
import { EStockComponent } from './components/e-stock/e-stock.component';

const routes: Routes = [
  {path: "estock", component: EStockComponent},
  {path: "companyAdd", component:CompanyAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
