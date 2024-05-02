import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GSearchComponent } from './g-search.component';

describe('GSearchComponent', () => {
  let component: GSearchComponent;
  let fixture: ComponentFixture<GSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GSearchComponent]
    });
    fixture = TestBed.createComponent(GSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
