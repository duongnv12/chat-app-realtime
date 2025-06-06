const client = require('prom-client');

client.collectDefaultMetrics();

const httpRequestDurationMilliseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Thời gian xử lý request',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [50, 100, 200, 300, 400, 500]
});

module.exports = { client, httpRequestDurationMilliseconds };
