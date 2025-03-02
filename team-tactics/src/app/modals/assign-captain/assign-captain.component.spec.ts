import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCaptainComponent } from './assign-captain.component';

describe('AssignCaptainComponent', () => {
  let component: AssignCaptainComponent;
  let fixture: ComponentFixture<AssignCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCaptainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
