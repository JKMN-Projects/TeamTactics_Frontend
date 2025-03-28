import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulletinComponent } from './create-bulletin.component';

describe('CreateBulletinComponent', () => {
  let component: CreateBulletinComponent;
  let fixture: ComponentFixture<CreateBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBulletinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
