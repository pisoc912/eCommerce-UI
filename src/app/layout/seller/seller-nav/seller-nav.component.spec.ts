import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerNavComponent } from './seller-nav.component';

describe('SellerNavComponent', () => {
  let component: SellerNavComponent;
  let fixture: ComponentFixture<SellerNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerNavComponent]
    });
    fixture = TestBed.createComponent(SellerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
