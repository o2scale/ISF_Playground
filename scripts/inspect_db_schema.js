const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // Adjusted for running from backend/ but .env is in root? No, .env is in backend/. Let's check where .env is.

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/isf_lms';

async function inspect() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB:', MONGO_URI);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n--- Collections ---');
        console.log(collections.map(c => c.name).sort());

        const modelsToCheck = [
            { name: 'Course', collection: 'courses' },
            { name: 'User', collection: 'users' },
            { name: 'StudentProgress', collection: 'studentprogresses' }, // Mongoose pluralizes
            { name: 'Submission', collection: 'submissions' },
            { name: 'Assignment', collection: 'assignments' },
            { name: 'Transaction', collection: 'transactions' },
            { name: 'Coin', collection: 'coins' }
        ];

        console.log('\n--- Sample Documents ---');
        for (const model of modelsToCheck) {
            const coll = mongoose.connection.collection(model.collection);
            const count = await coll.countDocuments();
            const sample = await coll.findOne({});

            console.log(`\n[${model.name}] (Count: ${count})`);
            if (sample) {
                // Log keys only to keep output clean, maybe deeply nested keys
                console.log(JSON.stringify(sample, null, 2));
            } else {
                console.log('No documents found.');
            }
        }

        // Specific Check for Course Categories
        const courses = mongoose.connection.collection('courses');
        const categories = await courses.distinct('category');
        console.log('\n--- Course Categories ---');
        console.log(categories);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

inspect();
