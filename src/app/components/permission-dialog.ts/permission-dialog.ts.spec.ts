import { ComponentFixture, TestBed } from '@angular/core/testing';


import { PermissionDialog } from './permission-dialog.ts';

describe('PermissionDialogTs', () => {
  let component: PermissionDialogTs;
  let fixture: ComponentFixture<PermissionDialogTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
