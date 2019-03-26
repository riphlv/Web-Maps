import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMapDataComponent } from './get-map-data.component';

describe('GetMapDataComponent', () => {
  let component: GetMapDataComponent;
  let fixture: ComponentFixture<GetMapDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMapDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMapDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
