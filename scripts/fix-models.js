#!/usr/bin/env node
/**
 * ORM Standardization Script
 * Fixes all Mongoose models to use safe patterns
 */

const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(__dirname, '..', 'backend', 'models');

// Models that need fixing (from grep results)
const MODELS_TO_FIX = [
  'activitylog.js',
  'attendance.js',
  'ContentLibrary.js',
  'CourseAssignment.js',
  'course.js',
  'doctor.js',
  'EmotionTracking.js',
  'FaceEmbedding.js',
  'FRSession.js',
  'hospital.js',
  'machine.js',
  'machineactivelog.js',
  'machineAssignment.js',
  'medical.js',
  'medicalCheckIns.js',
  'repairRequests.js',
  'schedules.js',
  'sportsTasks.js',
  'studentMoodTracker.js',
  'Submission.js',
  'task.js',
  'trainingSession.js',
  'userNotificationView.js',
  'wtfPin.js',
  'wtfSettings.js',
  'wtfStudentInteraction.js',
  'wtfSubmission.js',
  'purchaseOrders.js',
  'offlineReqQueue.js',
  'QuestionBank.js',
  'Quiz.js',
  'StudentProgress.js',
  'inventoryTransaction.js'
];

let fixed = 0;
let skipped = 0;
let errors = 0;

MODELS_TO_FIX.forEach(filename => {
  const filepath = path.join(MODELS_DIR, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`❌ ${filename}: File not found`);
    errors++;
    return;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Check if already uses safe pattern
  if (content.includes('mongoose.models.') && content.includes('||')) {
    console.log(`⏭️  ${filename}: Already uses safe pattern`);
    skipped++;
    return;
  }
  
  // Extract model name from the file
  const modelMatch = content.match(/const\s+(\w+)\s*=\s*mongoose\.model\(["'](\w+)["']/);
  if (!modelMatch) {
    // Try alternative pattern: module.exports = mongoose.model(...)
    const altMatch = content.match(/module\.exports\s*=\s*mongoose\.model\(["'](\w+)["']/);
    if (!altMatch) {
      console.log(`⚠️  ${filename}: Could not find model definition`);
      errors++;
      return;
    }
    
    // Fix alternative pattern
    const modelName = altMatch[1];
    const safePattern = `const ${modelName} = mongoose.models.${modelName} || mongoose.model("${modelName}"`;
    
    content = content.replace(
      /module\.exports\s*=\s*mongoose\.model\(/,
      `${safePattern}, `;
    );
    
    // Add module.exports line
    content = content.replace(
      new RegExp(`const ${modelName} = mongoose.models.${modelName}.*;`),
      `const ${modelName} = mongoose.models.${modelName} || mongoose.model("${modelName}", ${modelName.charAt(0).toLowerCase() + modelName.slice(1)}Schema);\n\nmodule.exports = ${modelName};`
    );
  } else {
    // Fix standard pattern
    const variableName = modelMatch[1];
    const modelName = modelMatch[2];
    
    const oldPattern = new RegExp(
      `const\\s+${variableName}\\s*=\\s*mongoose\\.model\\(["']${modelName}["']`,
      'g'
    );
    
    const newPattern = `const ${variableName} = mongoose.models.${modelName} || mongoose.model("${modelName}"`;
    
    content = content.replace(oldPattern, newPattern);
  }
  
  // Write back
  fs.writeFileSync(filepath, content);
  console.log(`✅ ${filename}: Fixed`);
  fixed++;
});

console.log('\n=== Summary ===');
console.log(`Fixed: ${fixed}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors}`);
console.log(`Total: ${MODELS_TO_FIX.length}`);
