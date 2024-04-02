/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InProcessJobsComponent } from './InProcessJobs.component';

describe('InProcessJobsComponent', () => {
  let component: InProcessJobsComponent;
  let fixture: ComponentFixture<InProcessJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProcessJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProcessJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
