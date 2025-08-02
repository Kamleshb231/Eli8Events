require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const multer = require('multer');
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const path = require('path');

// MongoDB connection
let db;
let bucket;

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined. Please check your .env file.');
  process.exit(1);
}

MongoClient.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(client => {
  console.log('Connected to MongoDB');
  db = client.db();
  bucket = new GridFSBucket(db, { bucketName: 'eventImages' });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file uploads to memory
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/gallery/upload - Upload an image for a service
app.post('/api/gallery/upload', upload.single('image'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Check if MongoDB is connected
    if (!db || !bucket) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    // Generate filename
    const service = req.body.service || 'general';
    const filename = `${service}_${Date.now()}${path.extname(req.file.originalname)}`;
    
    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { service: service }
    });
    
    // Write file data to GridFS
    uploadStream.end(req.file.buffer);
    
    // Wait for upload to complete
    const file = await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });
    
    res.status(201).json({ 
      fileId: file._id, 
      filename: file.filename,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
});

// GET /api/gallery/:service - List image file IDs for a service
app.get('/api/gallery/:service', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const files = await db.collection('eventImages.files').find({ 'metadata.service': req.params.service }).toArray();
    res.json(files.map(f => ({ id: f._id, filename: f.filename })));
  } catch (err) {
    console.error('Gallery fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch gallery images.' });
  }
});

// GET /api/gallery/image/:id - Stream an image by file ID
app.get('/api/gallery/image/:id', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!db || !bucket) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const _id = new ObjectId(req.params.id);
    const file = await db.collection('eventImages.files').findOne({ _id });
    if (!file) return res.status(404).json({ error: 'Image not found' });
    res.set('Content-Type', file.contentType || 'image/jpeg');
    bucket.openDownloadStream(_id).pipe(res);
  } catch (err) {
    console.error('Image fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch image.' });
  }
});

// Inquiry schema and routes
const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Inquiry = mongoose.model('Inquiry', inquirySchema);

// POST /api/inquiry
app.post('/api/inquiry', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Event Inquiry',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(201).json({ message: 'Inquiry submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit inquiry.' });
  }
});

// GET /api/inquiries - List all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
