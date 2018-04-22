import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteldetailComponent } from './hoteldetail.component';

describe('HoteldetailComponent', () => {
  let component: HoteldetailComponent;
  let fixture: ComponentFixture<HoteldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoteldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
