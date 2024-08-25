import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSummaryComponent } from './price-summary.component';

describe('PriceSummaryComponent', () => {
  let component: PriceSummaryComponent;
  let fixture: ComponentFixture<PriceSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceSummaryComponent]
    });
    fixture = TestBed.createComponent(PriceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
