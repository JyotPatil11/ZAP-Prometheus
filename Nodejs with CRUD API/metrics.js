const { collectDefaultMetrics, Gauge, register } = require('prom-client');

collectDefaultMetrics();
const cpuUsageGauge = new Gauge({
    name: 'node_process_cpu_usage_seconds_total',
    help: 'Total CPU usage of the Node.js process in seconds',
  });

  const updateCpuUsage = () => {
    const cpuUsage = process.cpuUsage();
    // Convert from microseconds to seconds
    const userCpuSeconds = cpuUsage.user / 1e6;
    const systemCpuSeconds = cpuUsage.system / 1e6;
    cpuUsageGauge.set(userCpuSeconds + systemCpuSeconds);
  };
  
  // Update CPU usage every 5 seconds
  setInterval(updateCpuUsage, 5000);


  //memory -usage metrics

  const memoryUsageGauge = new Gauge({
    name: 'nodejs_memory_usage_bytes',
    help: 'Memory usage of the Node.js application in bytes',
  });
  
  const updateMemoryUsage = () => {
    const memoryUsage = process.memoryUsage();
    memoryUsageGauge.set(memoryUsage.heapUsed);
  };
  
  // Update memory usage every 10 seconds
  setInterval(updateMemoryUsage, 10000);

  

  module.exports = { register };