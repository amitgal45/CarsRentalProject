import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCarsComponent } from './get-cars.component';

describe('GetCarsComponent', () => {
  let component: GetCarsComponent;
  let fixture: ComponentFixture<GetCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
