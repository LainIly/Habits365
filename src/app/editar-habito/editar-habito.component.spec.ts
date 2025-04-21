import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHabitoComponent } from './editar-habito.component';

describe('EditarHabitoComponent', () => {
  let component: EditarHabitoComponent;
  let fixture: ComponentFixture<EditarHabitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarHabitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
