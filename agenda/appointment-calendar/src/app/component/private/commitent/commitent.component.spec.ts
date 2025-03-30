import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitentComponent } from './commitent.component';

describe('CommitentComponent', () => {
  let component: CommitentComponent;
  let fixture: ComponentFixture<CommitentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommitentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
