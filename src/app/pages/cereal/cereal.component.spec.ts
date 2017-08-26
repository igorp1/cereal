/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CerealComponent } from './cereal.component';

describe('CerealComponent', () => {
  let component: CerealComponent;
  let fixture: ComponentFixture<CerealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
