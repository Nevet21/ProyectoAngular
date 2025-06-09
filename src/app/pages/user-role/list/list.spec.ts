import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleListComponent } from './list';

describe('List', () => {
  let component: UserRoleListComponent;
  let fixture: ComponentFixture<List>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
