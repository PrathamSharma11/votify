import multer from 'multer';

// Define storage settings for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Save files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to avoid filename conflicts
  }
});

// Initialize the upload object with storage settings
const multerUpload = multer({ storage: storage });

export default multerUpload;
