import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSystemComponent } from './point-system.component';

describe('PointSystemComponent', () => {
  let component: PointSystemComponent;
  let fixture: ComponentFixture<PointSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
