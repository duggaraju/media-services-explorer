/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocatorsComponent } from './locators.component';

describe('LocatorsComponent', () => {
  let component: LocatorsComponent;
  let fixture: ComponentFixture<LocatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
