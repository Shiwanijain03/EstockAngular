import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EStockComponent } from './e-stock.component';

describe('EStockComponent', () => {
  let component: EStockComponent;
  let fixture: ComponentFixture<EStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
