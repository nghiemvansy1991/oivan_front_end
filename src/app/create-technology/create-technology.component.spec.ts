import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnologyComponent } from './create-technology.component';

describe('CreateTechnologyComponent', () => {
  let component: CreateTechnologyComponent;
  let fixture: ComponentFixture<CreateTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTechnologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
