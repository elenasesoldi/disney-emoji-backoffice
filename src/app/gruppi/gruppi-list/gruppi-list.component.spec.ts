/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GruppiListComponent } from './gruppi-list.component';

describe('GruppiListComponent', () => {
  let component: GruppiListComponent;
  let fixture: ComponentFixture<GruppiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
