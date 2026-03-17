# Story 10.4: Infrastructure Cleanup

Status: ready-for-dev

## Findings Addressed
- C6: WebSocket handlePinLiked references undefined pinData
- C7: WebSocket handleSubmissionReviewed references undefined submissionData
- H10: S3 bucket env vars missing from .env.example
- M2: WtfPermissions.WTF_READ referenced but not defined
- L2: .env.example has duplicate JWT_SECRET
- L3: FRONTEND_URL and MOBILE_APP_URL not in .env.example

## Tasks
1. Fix backend/services/wtfWebSocket.js handlePinLiked — use correct variable (likeData or look up pin data)
2. Fix backend/services/wtfWebSocket.js handleSubmissionReviewed — use correct variable (reviewData or look up submission)
3. Add AWS_S3_BUCKET_NAME_SHOP_PRODUCTS and AWS_S3_BUCKET_NAME_LMS_CONTENT to backend/.env.example
4. Define WtfPermissions.WTF_READ constant (check where it's referenced and add the definition)
5. Remove duplicate JWT_SECRET from .env.example
6. Add FRONTEND_URL and MOBILE_APP_URL to .env.example with comments
7. Run: cd backend && npx jest --verbose (must pass)
