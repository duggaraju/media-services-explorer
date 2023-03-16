/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransformsComponent } from './transforms.component';

describe('TransformsComponent', () => {
  let component: TransformsComponent;
  let fixture: ComponentFixture<TransformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
