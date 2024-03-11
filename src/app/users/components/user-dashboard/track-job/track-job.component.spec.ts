/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrackJobComponent } from './track-job.component';

describe('TrackJobComponent', () => {
  let component: TrackJobComponent;
  let fixture: ComponentFixture<TrackJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
