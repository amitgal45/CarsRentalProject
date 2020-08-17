import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAvaliableCarsComponent } from './search-avaliable-cars.component';

describe('SearchAvaliableCarsComponent', () => {
  let component: SearchAvaliableCarsComponent;
  let fixture: ComponentFixture<SearchAvaliableCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAvaliableCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAvaliableCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
