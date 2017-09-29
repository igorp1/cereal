import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressPickerComponent } from './addressPicker.component';

describe('AddressPickerComponent', () => {
  let component: AddressPickerComponent;
  let fixture: ComponentFixture<AddressPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
