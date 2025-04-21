import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHabitosComponent } from './crear-habitos.component';

describe('CrearHabitosComponent', () => {
  let component: CrearHabitosComponent;
  let fixture: ComponentFixture<CrearHabitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearHabitosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearHabitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
