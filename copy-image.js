const fs = require('fs');
const src = "C:\\Users\\moksh\\.gemini\\antigravity\\brain\\ecf2d76d-6b1e-4727-a4f8-3b8734c23554\\.user_uploaded\\media_1793634146339_c8353bd0.jpg";
const dest = "C:\\Users\\moksh\\potfolio moksha\\public\\image.png";
fs.copyFileSync(src, dest);
console.log("Image copied to public/image.png successfully!");
// Also verify the public directory
const files = fs.readdirSync("C:\\Users\\moksh\\potfolio moksha\\public");
console.log("Public folder contents:", files);

