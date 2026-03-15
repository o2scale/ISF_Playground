#!/usr/bin/env node
/**
 * Comprehensive Model Standardization Script
 * Fixes all remaining Mongoose models to use safe patterns
 */

const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(__dirname, '..', 'backend', 'models');

console.log('=== ORM Model Standardization Script ===\n');

let fixed = 0;
let skipped = 0;
let errors = 0;

// Get all JS files in models directory
const files = fs.readdirSync(MODELS_DIR)
  .filter(f => f.endsWith('.js'))
  .filter(f => !f.includes('backup'));

files.forEach(filename => {
  const filepath = path.join(MODELS_DIR, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Skip if already uses safe pattern
  if (content.includes('mongoose.models.') && content.includes('||')) {
    console.log(`⏭️  ${filename}: Already compliant`);
    skipped++;
    return;
  }
  
  console.log(`🔧 Fixing ${filename}...`);
  
  try {
    // Pattern 1: const Model = mongoose.model("Model", schema);
    let pattern1 = /const\s+(\w+)\s*=\s*mongoose\.model\(["'](\w+)["'],\s*(\w+)\);?\s*$/m;
    let match1 = content.match(pattern1);
    
    // Pattern 2: module.exports = mongoose.model("Model", schema);
    let pattern2 = /module\.exports\s*=\s*mongoose\.model\(["'](\w+)["'],\s*(\w+)\);?/;
    let match2 = content.match(pattern2);
    
    // Pattern 3: const Model = mongoose.model('Model', schema);
    let pattern3 = /const\s+(\w+)\s*=\s*mongoose\.model\(['"](\w+)['"],\s*(\w+)\);?/;
    let match3 = content.match(pattern3);
    
    let modified = false;
    
    if (match1) {
      // Fix Pattern 1
      const varName = match1[1];
      const modelName = match1[2];
      const schemaName = match1[3];
      
      const oldLine = match1[0];
      const newLine = `const ${varName} = mongoose.models.${modelName} || mongoose.model("${modelName}", ${schemaName});`;
      
      content = content.replace(oldLine, newLine);
      modified = true;
      
    } else if (match2) {
      // Fix Pattern 2
      const modelName = match2[1];
      const schemaName = match2[2];
      const varName = modelName; // Use model name as variable name
      
      const oldText = match2[0];
      const newText = `const ${varName} = mongoose.models.${modelName} || mongoose.model("${modelName}", ${schemaName});\n\nmodule.exports = ${varName};`;
      
      content = content.replace(oldText, newText);
      modified = true;
      
    } else if (match3) {
      // Fix Pattern 3
      const varName = match3[1];
      const modelName = match3[2];
      const schemaName = match3[3];
      
      const oldLine = match3[0];
      const newLine = `const ${varName} = mongoose.models.${modelName} || mongoose.model("${modelName}", ${schemaName});`;
      
      content = content.replace(oldLine, newLine);
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filepath, content);
      console.log(`✅ ${filename}: Fixed`);
      fixed++;
    } else {
      console.log(`⚠️  ${filename}: Could not find model pattern`);
      errors++;
    }
    
  } catch (err) {
    console.error(`❌ ${filename}: Error - ${err.message}`);
    errors++;
  }
});

console.log('\n=== Summary ===');
console.log(`✅ Fixed: ${fixed}`);
console.log(`⏭️  Skipped: ${skipped}`);
console.log(`⚠️  Errors: ${errors}`);
console.log(`📊 Total: ${files.length}`);
console.log(`\n🎯 Compliance: ${skipped + fixed}/${files.length} (${Math.round((skipped + fixed) / files.length * 100)}%)`);
