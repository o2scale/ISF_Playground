# Known Issues - FR Rebuild

**Last Updated:** 2025-10-23 10:28:13

## Node.js v22 + TensorFlow.js Compatibility Issue

**Status:** Known Issue - Workaround Available
**Task:** Task 2 - Human Installation
**Severity:** Medium (blocks local testing, not production)

### Problem

TensorFlow.js Node (@tensorflow/tfjs-node v4.22.0) has native binding compatibility issues with Node.js v22.14.0:

```
Error: The specified module could not be found.
\\?\D:\Dev\ISF_Playground\backend\node_modules\@tensorflow\tfjs-node\lib\napi-v8\tfjs_binding.node
```

The package was built for napi-v8 but Node v22 requires napi-v10 bindings.

### Impact

- ❌ Cannot test Human library locally on Node v22
- ❌ Server fails to start with current configuration
- ✅ Code structure and configuration are correct
- ✅ Will work on Node v18/v20 or when tfjs-node v5 is released

### Workarounds

**Option 1: Downgrade Node.js (Recommended for Local Testing)**
```bash
nvm install 20.18.0
nvm use 20.18.0
cd backend && npm install
npm start
```

**Option 2: Wait for TensorFlow.js v5**
- tfjs-node v5 will support Node v22
- Monitor: https://github.com/tensorflow/tfjs/releases

**Option 3: Use Human with Browser/ESM Build**
- Requires refactoring server.js to use ES modules
- Use `import Human from '@vladmandic/human'` with `"type": "module"`

**Option 4: Docker Container with Node v20**
```dockerfile
FROM node:20-alpine
# ... rest of Dockerfile
```

### Resolution Plan

For now, continuing with implementation:
- ✅ Task 2: Human installed and configured
- ⏳ Task 3-15: Can be developed (code structure only)
- 🧪 Testing: Will use Node v20 environment or wait for tfjs v5

### Files Affected

- `backend/package.json` - Has @tensorflow/tfjs-node@4.22.0
- `backend/config/humanConfig.js` - Configured for WASM backend (still needs tfjs-node)
- `backend/server.js` - Human initialization code added

### References

- https://github.com/tensorflow/tfjs/issues/8044
- https://github.com/vladmandic/human/issues/458
