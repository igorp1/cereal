import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListItemComponent } from './storeListItem.component';

describe('StoreListItemComponent', () => {
  let component: StoreListItemComponent;
  let fixture: ComponentFixture<StoreListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
