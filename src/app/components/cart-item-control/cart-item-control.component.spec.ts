import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemControlComponent } from './cart-item-control.component';

describe('CartItemControlComponent', () => {
  let component: CartItemControlComponent;
  let fixture: ComponentFixture<CartItemControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemControlComponent]
    });
    fixture = TestBed.createComponent(CartItemControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
