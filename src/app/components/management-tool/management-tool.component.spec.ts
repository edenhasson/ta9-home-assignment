import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementToolComponent } from './management-tool.component';

describe('ManagementToolComponent', () => {
  let component: ManagementToolComponent;
  let fixture: ComponentFixture<ManagementToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
