const express = require('express');
// const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const xlsx = require('xlsx');
const router = express.Router();
const connection = require('../databaseConnection');
const cors = require('cors');

router.use(cors());
router.use(express.json());
router.use(fileUpload());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

router.get('/api/get-single-api/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [results] = await connection.execute('SELECT * FROM api_handler WHERE id = ? AND del_flag = ?', [id, 0]);
    res.status(200).json({
      success: true,
      result: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

router.get('/api/get-all-apis', async (req, res) => {
  try {
    const [results] = await connection.execute(
      'SELECT id, name FROM api_handler WHERE del_flag = ? AND active_flag = ?', 
      [0, 1]
    );
    res.status(200).json({
      success: true,
      result: results
    });
  } catch (error) {
    console.error('Error fetching handlers:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

// router.post('/upload-image', upload.single('upload'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: 'No file uploaded' });
//   }

//   const filePath = path.join(__dirname, '../uploads/', req.file.filename);

//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'Failed to read file' });
//     }

//     res.status(200).json({
//       uploaded: true,
//       url: filePath,
//     });
//   });
// });

  router.post('/api/upload-excel', async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    try {
      const workbook = xlsx.read(file.data, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
  
      const insertQuery = `
        INSERT INTO api_handler 
        (client_id, name, endpoint, authorization, payload, response, added_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      for (const row of data) {
        const {
          client_id,
          name,
          endpoint,
          authorization,
          payload,
          response,
        } = row;
  
        const currentDate = new Date();
  
        await connection.execute(insertQuery, [client_id, name, endpoint, authorization, payload, response, currentDate]);
      }
  
      res.status(200).json({ success: true, message: 'Data has been successfully inserted.' });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({ success: false, message: 'Failed to process file' });
    }
  });

module.exports = router;
