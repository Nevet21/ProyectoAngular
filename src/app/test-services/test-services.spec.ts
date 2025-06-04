import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestServices } from './test-services';

describe('TestServices', () => {
  let component: TestServices;
  let fixture: ComponentFixture<TestServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
