const fs = require('fs');
const path = require('path');

// Read the compiled JS file
const distPath = path.join(__dirname, '../dist/index.js');
let content = fs.readFileSync(distPath, 'utf8');

// Add CommonJS compatibility
content = content.replace(
  'exports.default = kenum;',
  `exports.default = kenum;
module.exports = kenum;
module.exports.default = kenum;`
);

// Write back
fs.writeFileSync(distPath, content);
console.log('✅ Fixed CommonJS export compatibility');