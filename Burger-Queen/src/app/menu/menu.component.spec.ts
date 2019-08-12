import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Botón desayuno debe mostrar el menú para desayuno', () => {
    component.openBreakfastMenu();
    fixture.detectChanges();
    expect(component.showBreakfast).toBe(true);
  });

  it('Botón almuerzo debe mostrar el menú para almuerzo', () => {
    component.openLunchMenu()
    fixture.detectChanges();
    expect(component.showLunch).toBe(true);
  });
});