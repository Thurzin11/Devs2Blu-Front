import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitentFormComponent } from './commitent-form.component';

describe('CommitentFormComponent', () => {
  let component: CommitentFormComponent;
  let fixture: ComponentFixture<CommitentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommitentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
