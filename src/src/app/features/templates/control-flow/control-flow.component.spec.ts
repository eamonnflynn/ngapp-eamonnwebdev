import { TestBed } from '@angular/core/testing';
import { ControlFlowComponent } from './control-flow.component';

describe('ControlFlowComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlFlowComponent],
    }).compileComponents();
  });

  it('should initialize with default states', () => {
    const fixture = TestBed.createComponent(ControlFlowComponent);
    const comp = fixture.componentInstance;

    expect(comp.isLoggedIn()).toBe(true);
    expect(comp.isAdmin()).toBe(false);
    expect(comp.orderStatus()).toBe('processing');
  });

  it('should switch order statuses properly', () => {
    const fixture = TestBed.createComponent(ControlFlowComponent);
    const comp = fixture.componentInstance;

    comp.orderStatus.set('delivered');
    expect(comp.orderStatus()).toBe('delivered');

    comp.orderStatus.set('cancelled');
    expect(comp.orderStatus()).toBe('cancelled');
  });
});
