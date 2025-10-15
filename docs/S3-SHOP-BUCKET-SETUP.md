# S3 Bucket Setup for Shop Product Images

## Quick Reference

**Bucket Name:** `balagruha-shop-product-images`
**Region:** `ap-south-1` (Asia Pacific - Mumbai)
**Purpose:** Store shop product images uploaded by coaches/admins

---

## Setup Options

### Option 1: AWS CLI (Recommended - Fastest)

```bash
# 1. Create bucket
aws s3api create-bucket \
  --bucket balagruha-shop-product-images \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

# 2. Enable public access
aws s3api put-public-access-block \
  --bucket balagruha-shop-product-images \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 3. Add bucket policy for public read
cat > /tmp/bucket-policy.json << 'EOF'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::balagruha-shop-product-images/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
  --bucket balagruha-shop-product-images \
  --policy file:///tmp/bucket-policy.json

# 4. Add CORS configuration
cat > /tmp/cors.json << 'EOF'
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
            "AllowedOrigins": [
                "http://localhost:3000",
                "https://playground.initiativesewafoundation.com"
            ],
            "ExposeHeaders": ["ETag"],
            "MaxAgeSeconds": 3000
        }
    ]
}
EOF

aws s3api put-bucket-cors \
  --bucket balagruha-shop-product-images \
  --cors-configuration file:///tmp/cors.json

echo "✅ S3 bucket setup complete!"
```

---

### Option 2: AWS Console (Manual)

#### Step 1: Create Bucket
1. Go to: https://console.aws.amazon.com/s3
2. Click **"Create bucket"**
3. **Bucket name:** `balagruha-shop-product-images`
4. **AWS Region:** `Asia Pacific (Mumbai) ap-south-1`
5. **Object Ownership:** ACLs disabled
6. **Block Public Access:**
   - ☐ **UNCHECK** "Block all public access"
   - ☑ Check acknowledgment box
7. **Versioning:** Disabled
8. **Encryption:** Enable (SSE-S3)
9. Click **"Create bucket"**

#### Step 2: Configure CORS
1. Open the bucket
2. Go to **Permissions** tab
3. Scroll to **Cross-origin resource sharing (CORS)**
4. Click **Edit**
5. Paste this configuration:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "http://localhost:3000",
            "https://playground.initiativesewafoundation.com"
        ],
        "ExposeHeaders": [
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

6. Click **Save changes**

#### Step 3: Add Bucket Policy
1. Stay in **Permissions** tab
2. Scroll to **Bucket policy**
3. Click **Edit**
4. Paste this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::balagruha-shop-product-images/*"
        }
    ]
}
```

5. Click **Save changes**

---

## Environment Variable Setup

Add this line to `backend/.env`:

```env
AWS_S3_BUCKET_NAME_SHOP_PRODUCTS=balagruha-shop-product-images
```

**Complete S3 configuration in .env should look like:**
```env
AWS_S3_ACCESS_KEY_ID=<your-access-key-id>
AWS_S3_SECRET_KEY=<your-secret-access-key>
AWS_S3_REGION=ap-south-1
AWS_S3_BUCKET_NAME_TASK_ATTACHMENTS=balagruha-task-attachments
AWS_S3_BUCKET_NAME_MEDICAL_RECORDS=student-medical-records
AWS_S3_BUCKET_NAME_SPORTS_TASK_ATTACHMENTS=balagruha-sports-task-attachments
AWS_S3_BUCKET_NAME_REPAIR_REQUEST_ATTACHMENTS=balagruha-repair-request-attachments
AWS_S3_BUCKET_NAME_PURCHASE_ORDER_ATTACHMENTS=balagruha-purchase-order-attachments
AWS_S3_WTF_BUCKET_NAME=wtfpins
AWS_S3_BUCKET_NAME_SHOP_PRODUCTS=balagruha-shop-product-images  # <-- NEW
```

---

## Testing the Setup

After creating the bucket, run the test script:

```bash
cd backend
node scripts/testShopS3.js
```

**Expected output:**
```
🧪 Testing S3 Bucket Configuration for Shop Products

📋 Configuration:
   Region: ap-south-1
   Bucket: balagruha-shop-product-images
   Access Key: AKIA3CMC...

📤 Test 1: Uploading test file...
   ✅ Upload successful
📥 Test 2: Reading test file...
   ✅ Read successful
🌐 Test 3: Public URL generated
   URL: https://balagruha-shop-product-images.s3.ap-south-1.amazonaws.com/test/test-file.txt
   ℹ️  Try opening this URL in browser to verify public access
🗑️  Test 4: Deleting test file...
   ✅ Delete successful

🎉 SUCCESS! S3 bucket is configured correctly!

✅ All tests passed:
   ✓ Upload works
   ✓ Read works
   ✓ Public URL generated
   ✓ Delete works

💡 You can now proceed with Story-14 implementation
```

---

## IAM Permissions (Already Configured)

Your IAM user should already have permissions since other buckets are working. If you encounter permission issues, ensure the IAM policy includes:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::balagruha-shop-product-images",
                "arn:aws:s3:::balagruha-shop-product-images/*"
            ]
        }
    ]
}
```

---

## Verification Checklist

Before proceeding with Story-14 implementation:

- [ ] Bucket `balagruha-shop-product-images` created in `ap-south-1` region
- [ ] CORS configuration added
- [ ] Bucket policy added (public read access)
- [ ] Environment variable `AWS_S3_BUCKET_NAME_SHOP_PRODUCTS` added to `.env`
- [ ] Test script `node scripts/testShopS3.js` passes all 4 tests
- [ ] Can access public URL in browser (test file URL from test script)

---

## Expected File Structure in S3

After implementation, shop product images will be organized as:

```
balagruha-shop-product-images/
└── shop/
    └── products/
        ├── 67abc123_1729876543210.jpg
        ├── 67abc123_1729876543211.png
        ├── 67def456_1729876600000.jpg
        └── ...
```

**Naming pattern:** `shop/products/{productId}_{timestamp}.{extension}`

---

## Cost Estimate

**Storage:** ~$0.023/GB per month (ap-south-1 pricing)
**Requests:**
- PUT: $0.005 per 1,000 requests
- GET: $0.0004 per 1,000 requests

**Example:** 1,000 products with 3 images each (2MB avg) = ~6GB = **$0.14/month**

---

## Troubleshooting

### Test fails with "NoSuchBucket"
- Bucket not created yet
- Create bucket using AWS CLI or Console

### Test fails with "AccessDenied"
- IAM user lacks permissions
- Add S3 permissions to IAM user policy

### Test fails with "InvalidAccessKeyId"
- AWS credentials in .env are incorrect
- Verify `AWS_S3_ACCESS_KEY_ID` and `AWS_S3_SECRET_KEY`

### Public URL returns 403 Forbidden
- Bucket policy not configured correctly
- Ensure public read access is enabled

### CORS errors in browser
- CORS configuration missing or incorrect
- Add CORS config with your domain

---

## Next Steps

Once all tests pass:
1. ✅ Confirm with Dev Agent James
2. 🚀 Proceed with Story-14 implementation
3. 📦 Run migration script to move existing product images
4. 🧪 QA testing

---

**Created:** October 15, 2025
**Story:** Sprint5-Story-14 - Shop Product Image Upload
