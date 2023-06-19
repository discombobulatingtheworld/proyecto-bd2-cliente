import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizePage } from './finalize.page';

describe('FinalizePage', () => {
  let component: FinalizePage;
  let fixture: ComponentFixture<FinalizePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinalizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
