/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MilkComponent } from './milk.component';

describe('MilkComponent', () => {
  let component: MilkComponent;
  let fixture: ComponentFixture<MilkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
