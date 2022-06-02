import { async, TestBed } from '@angular/core/testing';
import { NgxAbstractModule } from './ngx-abstract.module';

describe('NgxAbstractModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxAbstractModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(NgxAbstractModule).toBeDefined();
  });
});
