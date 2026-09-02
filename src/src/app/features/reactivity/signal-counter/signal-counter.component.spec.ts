import { TestBed } from '@angular/core/testing';
import { SignalCounterComponent } from './signal-counter.component';

describe('SignalCounterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalCounterComponent],
    }).compileComponents();
  });

  it('should initialize count to 0 and calculate double and parity', () => {
    const fixture = TestBed.createComponent(SignalCounterComponent);
    const comp = fixture.componentInstance;

    expect(comp.count()).toBe(0);
    expect(comp.doubleCount()).toBe(0);
    expect(comp.isEven()).toBe(true);
    expect(comp.signDescription()).toBe('Zero');
  });

  it('should increment count by step value and recompute dependencies', () => {
    const fixture = TestBed.createComponent(SignalCounterComponent);
    const comp = fixture.componentInstance;

    comp.step.set(5);
    comp.increment();

    expect(comp.count()).toBe(5);
    expect(comp.doubleCount()).toBe(10);
    expect(comp.isEven()).toBe(false);
    expect(comp.signDescription()).toBe('Positive');
  });

  it('should toggle between playground and code tabs', () => {
    const fixture = TestBed.createComponent(SignalCounterComponent);
    const comp = fixture.componentInstance;

    expect(comp.activeTab()).toBe('playground');
    comp.activeTab.set('code');
    expect(comp.activeTab()).toBe('code');
  });
});
