import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalExperienceComponent } from './technical-experience.component';

describe('TechnicalExperienceComponent', () => {
  let component: TechnicalExperienceComponent;
  let fixture: ComponentFixture<TechnicalExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
