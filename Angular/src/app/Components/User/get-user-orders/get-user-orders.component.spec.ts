import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserOrdersComponent } from './get-user-orders.component';

describe('GetUserOrdersComponent', () => {
  let component: GetUserOrdersComponent;
  let fixture: ComponentFixture<GetUserOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUserOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUserOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
