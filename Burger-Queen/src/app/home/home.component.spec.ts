import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let titleElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    titleElement = fixture.debugElement.query(By.css('h1'))
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Burger Queen'`, () => {
    expect(component.title).toEqual('Burger Queen');
  });

  it(`deberia de renderizar title en un h1 tag`, () => {
    expect(titleElement.nativeElement.textContent).toEqual('Burger Queen');
  });
});