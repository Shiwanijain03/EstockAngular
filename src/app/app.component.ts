import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EStockService } from './services/e-stock.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EStock';
  
  constructor( private _eStock: EStockService,
    private route: ActivatedRoute,
    private router: Router){
      // _eStock.getCompany().subscribe(response => {
      //   debugger;
      // })
    debugger;

     
  }
  ngOnInit(): void {
    this.router.navigate(["/estock"]);
  }
}
   

