import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolexComponent } from './rolex.component';

describe('RolexComponent', () => {
  let component: RolexComponent;
  let fixture: ComponentFixture<RolexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
