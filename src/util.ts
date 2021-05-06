import Benchmark, { Event, Suite } from 'benchmark';

Benchmark.options.initCount = 50;
Benchmark.options.minSamples = 200;

function benchCycle(e: Event): void { console.log('[benchi] %s', String(e.target)); }

function benchFinish(this: Suite): void {
  // eslint-disable-next-line no-invalid-this
  console.log(`\n[benchi]--->fast: ${this.filter('fastest').map('name')}\n[benchi]--->slow: ${this.filter('slowest').map('name')}\n`);
}

export interface Bench {
  name: string;
  fn: () => unknown;
}

export function bench(...benches: Bench[]): void {
  const suite = new Suite;
  for (let i = 0; i !== benches.length; ++i) suite.add(benches[i].name, benches[i].fn);
  suite.on('cycle', benchCycle).on('complete', benchFinish).run();
}
