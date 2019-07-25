import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { BreakfastMenuComponent } from '../breakfast-menu/breakfast-menu.component';
import { LunchMenuComponent } from '../lunch-menu/lunch-menu.component';
import { DataService } from '../data.service';
import { MenuService } from '../services/menu.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let breakfastMenuComp: BreakfastMenuComponent;
  let lunchMenuComp: LunchMenuComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        BreakfastMenuComponent,
        LunchMenuComponent ],
      providers: [
        DataService,
        MenuService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BreakfastMenuComponent', () => {
    expect(breakfastMenuComp).toBeTruthy();
  });

  it('should create BreakfastMenuComponent', () => {
    expect(breakfastMenuComp).toBeTruthy();
  });

  it('should create LunchMenuComponent', () => {
    expect(lunchMenuComp).toBeTruthy();
  });
});