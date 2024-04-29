/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobsOntheWayComponent } from './jobs-ontheWay.component';

describe('JobsOntheWayComponent', () => {
  let component: JobsOntheWayComponent;
  let fixture: ComponentFixture<JobsOntheWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsOntheWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsOntheWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
