## Playground Server Case-Sensitivity Incident

### Summary
- Production (Ubuntu) uses a case-sensitive filesystem; our repo previously stored certain Mongoose models (e.g., `shopItem.js`, `purchaseRequest.js`) as thin wrappers that imported capitalized files (`./ShopItem`, `./PurchaseRequest`).
- The Windows-based workflow (case-insensitive) collapsed the uppercase files, so they never reached origin. When production pulled the latest commit, Node could not resolve the capitalized modules and PM2 entered a restart loop.
- Additionally, SSH access required the `playgroundserver.pem` key stored on the server under `/home/ubuntu/workspace/isfplayground/playgroundserver.pem`; this key was missing locally, so the team needed instructions to retrieve it via `scp`.

### Fix Implemented
1. **Models**
   - Inlined the full schema definitions directly inside the lowercase files:
     - `backend/models/shopItem.js`
     - `backend/models/purchaseRequest.js`
   - Removed the uppercase duplicates so future clones (Windows or Linux) see a single source of truth. Commit: `33c6da3 fix(models): inline shop and purchase schemas`.

2. **Server Access Key**
   - Confirmed the PEM resides at `/home/ubuntu/workspace/isfplayground/playgroundserver.pem` on the EC2 instance.
   - To pull it down locally:
     ```bash
     scp ubuntu@ec2-13-201-212-172.ap-south-1.compute.amazonaws.com:/home/ubuntu/workspace/isfplayground/playgroundserver.pem ./playgroundserver.pem
     chmod 400 playgroundserver.pem
     ssh -i playgroundserver.pem ubuntu@ec2-13-201-212-172.ap-south-1.compute.amazonaws.com
     ```

### Lessons / Future Steps
- Ensure `core.ignorecase` remains `false` in this repository to avoid silent file collapses.
- Prefer lowercase filenames exclusively for shared modules to remain cross-platform safe.
- Keep a secure off-box backup of critical SSH keys; do not rely on server-local copies only.
