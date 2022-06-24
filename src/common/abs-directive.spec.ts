import { ElementRef, TemplateRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { AbsDirective } from './abs-directive';

class SimpleDirective extends AbsDirective {}

describe('AbsDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SimpleDirective,
        TemplateRef,
        {
          provide: ElementRef,
          useValue: {},
        },
      ],
    });
  });

  it('should create an instance', inject(
    [SimpleDirective],
    (directive: SimpleDirective) => {
      expect(directive).toBeTruthy();
    }
  ));
});
