import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMapDataComponent } from './edit-map-data.component';

describe('EditMapDataComponent', () => {
  let component: EditMapDataComponent;
  let fixture: ComponentFixture<EditMapDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMapDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMapDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
