import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFormationComponent } from './team-formation.component';

describe('TeamFormationComponent', () => {
  let component: TeamFormationComponent;
  let fixture: ComponentFixture<TeamFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFormationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
