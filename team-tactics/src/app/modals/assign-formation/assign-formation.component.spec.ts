import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFormationComponent } from './assign-formation.component';

describe('AssignFormationComponent', () => {
  let component: AssignFormationComponent;
  let fixture: ComponentFixture<AssignFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignFormationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
