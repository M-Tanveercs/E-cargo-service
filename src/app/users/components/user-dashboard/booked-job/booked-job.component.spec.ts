/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookedJobComponent } from './booked-job.component';

describe('BookedJobComponent', () => {
  let component: BookedJobComponent;
  let fixture: ComponentFixture<BookedJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
