// Test CORS from a browser-like environment
const http = require('http');

function testEndpoint(path, description) {
  return new Promise((resolve) => {
    console.log(`\n=== Testing: ${description} ===`);
    console.log(`Endpoint: ${path}`);

    const options = {
      hostname: 'localhost',
      port: 5001,
      path: path,
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type,Authorization'
      }
    };

    const req = http.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log('CORS Headers:');
      console.log(`  Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin'] || 'MISSING'}`);
      console.log(`  Access-Control-Allow-Methods: ${res.headers['access-control-allow-methods'] || 'MISSING'}`);
      console.log(`  Access-Control-Allow-Headers: ${res.headers['access-control-allow-headers'] || 'MISSING'}`);
      console.log(`  Access-Control-Allow-Credentials: ${res.headers['access-control-allow-credentials'] || 'MISSING'}`);

      const result = {
        path,
        status: res.statusCode,
        cors: !!res.headers['access-control-allow-origin']
      };

      resolve(result);
    });

    req.on('error', (e) => {
      console.error(`ERROR: ${e.message}`);
      resolve({ path, error: e.message });
    });

    req.end();
  });
}

async function runTests() {
  console.log('========================================');
  console.log('CORS ENDPOINT TESTING');
  console.log('Testing from Origin: http://localhost:3000');
  console.log('Backend: http://localhost:5001');
  console.log('========================================');

  const endpoints = [
    { path: '/api/auth/login', desc: 'Authentication Login' },
    { path: '/api/v2/lms/admin/courses', desc: 'LMS Admin Courses' },
    { path: '/api/roles/getAllRolePermissions', desc: 'RBAC Roles' },
    { path: '/api/users', desc: 'User Management' },
    { path: '/api/v1/machines', desc: 'Machine Management' },
    { path: '/api/tasks/all/list', desc: 'Task Management' }
  ];

  const results = [];
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.path, endpoint.desc);
    results.push(result);
  }

  console.log('\n\n========================================');
  console.log('SUMMARY');
  console.log('========================================');

  const working = results.filter(r => r.cors && r.status === 204);
  const failing = results.filter(r => !r.cors || r.status !== 204);

  console.log(`\n✅ Working (${working.length}):`);
  working.forEach(r => console.log(`  - ${r.path}`));

  console.log(`\n❌ Failing (${failing.length}):`);
  failing.forEach(r => console.log(`  - ${r.path} (Status: ${r.status}${r.error ? ', Error: ' + r.error : ''})`));

  if (failing.length === 0) {
    console.log('\n🎉 ALL ENDPOINTS WORKING! CORS is configured correctly.');
  } else {
    console.log('\n⚠️  CORS ISSUE DETECTED: Some endpoints are not returning CORS headers.');
  }
}

runTests().catch(console.error);
