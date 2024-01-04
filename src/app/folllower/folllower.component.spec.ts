import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolllowerComponent } from './folllower.component';

describe('FolllowerComponent', () => {
  let component: FolllowerComponent;
  let fixture: ComponentFixture<FolllowerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolllowerComponent]
    });
    fixture = TestBed.createComponent(FolllowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
