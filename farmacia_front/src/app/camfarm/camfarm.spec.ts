import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Camfarm } from './camfarm';

describe('Camfarm', () => {
  let component: Camfarm;
  let fixture: ComponentFixture<Camfarm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Camfarm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Camfarm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
