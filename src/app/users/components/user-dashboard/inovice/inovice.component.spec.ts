/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InoviceComponent } from './inovice.component';

describe('InoviceComponent', () => {
  let component: InoviceComponent;
  let fixture: ComponentFixture<InoviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InoviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InoviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
