'use strict';

const {
  performance,
  PerformanceObserver
} = require('perf_hooks');
const mod = require('module');

// Monkey patch the require function
mod.Module.prototype.require = performance.timerify(mod.Module.prototype.require);
require = performance.timerify(require);

// Activate the perf observer
const obs = new PerformanceObserver((list) => {
  let fullRequireTime = 0;
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`loadingModule '${entry[0]}' in %s ms`, entry.duration);
    fullRequireTime += entry.duration;
  });
  console.log(`Average require time: ${fullRequireTime / entries.length} ms`);
  console.log(`Complete load time ${fullRequireTime} ms`);
  obs.disconnect();
});
obs.observe({ entryTypes: ["function"], buffered: true });
