# Story 10.2: Client-Side Auth & API Fixes

Status: ready-for-dev

## Findings Addressed
- C8: useFileUpload explicitly sets Content-Type without boundary
- H3: 401 interceptor incomplete localStorage cleanup
- H5: studentPinLogin returns different shape than pinLogin
- M8: mode: "no-cors" set as HTTP header in axios instances
- M9: WTF API calls set explicit Content-Type: multipart/form-data

## Tasks
1. Fix frontend/src/hooks/useFileUpload.js — switch to apiWithoutContentType (or api without explicit Content-Type) and remove the explicit Content-Type header, letting Axios auto-detect from FormData
2. Fix frontend/src/api/client.js 401 interceptor — on token expiry, remove ALL auth keys from localStorage: token, name, role, userId, balagruhaIds (match AuthContext.logout() cleanup)
3. Fix frontend/src/api/auth.js studentPinLogin() — return response.data instead of response (normalize with pinLogin)
4. Remove mode: "no-cors" from any axios instance config in frontend/src/api/client.js or other API files
5. Remove explicit Content-Type: multipart/form-data from frontend/src/api/wtf.js upload calls — let Axios handle boundary
6. Run: cd frontend && npx react-scripts build (must succeed)
7. Run: cd frontend && npx react-scripts test --watchAll=false --verbose (must pass)
8. Run: cd backend && npx jest --verbose (must pass)
