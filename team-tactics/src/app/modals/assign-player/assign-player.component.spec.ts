import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPlayerComponent } from './assign-player.component';

describe('AssignPlayerComponent', () => {
  let component: AssignPlayerComponent;
  let fixture: ComponentFixture<AssignPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
