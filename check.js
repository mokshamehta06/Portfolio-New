const fs = require('fs');
const { execSync } = require('child_process');

// Check public folder
const publicDir = "C:\\Users\\moksh\\potfolio moksha\\public";
console.log("Public folder contents:", fs.readdirSync(publicDir));

// Check project root for stubs
const projectDir = "C:\\Users\\moksh\\potfolio moksha";
const files = fs.readdirSync(projectDir).filter(f => 
  !f.startsWith('.') && !['node_modules', 'src', 'dist', 'public'].includes(f)
);
console.log("Root files (excl. hidden/dirs):", files);

