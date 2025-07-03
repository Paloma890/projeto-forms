import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsConteinerComponent } from './buttons-conteiner.component';

describe('ButtonsConteinerComponent', () => {
  let component: ButtonsConteinerComponent;
  let fixture: ComponentFixture<ButtonsConteinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsConteinerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsConteinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
