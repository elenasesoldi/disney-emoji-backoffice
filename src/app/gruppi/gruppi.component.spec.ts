/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GruppiComponent } from './gruppi.component';

describe('GruppiComponent', () => {
  let component: GruppiComponent;
  let fixture: ComponentFixture<GruppiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
