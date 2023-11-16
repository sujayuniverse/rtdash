import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharttestPage } from './charttest.page';

describe('CharttestPage', () => {
  let component: CharttestPage;
  let fixture: ComponentFixture<CharttestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CharttestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
