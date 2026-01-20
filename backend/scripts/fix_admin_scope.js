const mongoose = require('mongoose');
const Role = require('../models/role');

const uri = "mongodb+srv://admin:admin0987@cluster1.kkubs.mongodb.net/isfplayground?retryWrites=true&w=majority&appName=cluster1";

const fixScope = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to DB');

        const roles = await Role.find({});
        console.log('Available Roles:', roles.map(r => r.roleName));

        const adminRole = roles.find(r => r.roleName.toLowerCase() === 'admin');

        if (!adminRole) {
            console.log('Admin role not found (even case-insensitive)');
            process.exit(1);
        }

        console.log(`Found Admin Role: ${adminRole.roleName}`);

        let updated = false;
        const targets = ['User Management', 'Balagruha Management', 'LMS Management'];

        adminRole.permissions.forEach(p => {
            // Check if module strictly equals target
            if (targets.includes(p.module)) {
                if (p.scope !== 'all') {
                    console.log(`Updating scope for ${p.module} from '${p.scope || 'undefined'}' to 'all'`);
                    p.scope = 'all';
                    updated = true;
                }
            }
        });

        if (updated) {
            adminRole.markModified('permissions');
            await adminRole.save();
            console.log('Admin permissions updated successfully.');
        } else {
            console.log('Admin permissions already correct.');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixScope();
