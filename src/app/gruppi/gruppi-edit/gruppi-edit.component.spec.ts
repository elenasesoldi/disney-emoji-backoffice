/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GruppiEditComponent } from './gruppi-edit.component';

describe('GruppiEditComponent', () => {
  let component: GruppiEditComponent;
  let fixture: ComponentFixture<GruppiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
