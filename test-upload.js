const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Test file upload
async function testUpload() {
  try {
    // Create a simple test file
    const testFilePath = path.join(__dirname, 'test-image.jpg');
    fs.writeFileSync(testFilePath, 'This is a test image file content');
    
    // Create form data
    const form = new FormData();
    form.append('image', fs.createReadStream(testFilePath));
    form.append('service', 'corporate');
    
    // Send POST request to upload endpoint
    const response = await fetch('http://localhost:5000/api/gallery/upload', {
      method: 'POST',
      body: form
    });
    
    // Get response
    const result = await response.json();
    console.log('Upload response:', result);
    
    // Clean up test file
    fs.unlinkSync(testFilePath);
    
    if (response.ok) {
      console.log('File upload test PASSED');
    } else {
      console.log('File upload test FAILED');
    }
  } catch (error) {
    console.error('Upload test error:', error);
  }
}

// Run test
testUpload();
