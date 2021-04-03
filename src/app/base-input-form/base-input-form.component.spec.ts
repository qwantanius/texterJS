import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInputFormComponent } from './base-input-form.component';

describe('BaseInputFormComponent', () => {
  let component: BaseInputFormComponent;
  let fixture: ComponentFixture<BaseInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseInputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
