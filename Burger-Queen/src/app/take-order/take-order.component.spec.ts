import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOrderComponent } from './take-order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TakeOrderComponent', () => {
  let component: TakeOrderComponent;
  let fixture: ComponentFixture<TakeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TakeOrderComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TakeOrderComponent', () => {
    expect(component).toBeTruthy();
  });
});