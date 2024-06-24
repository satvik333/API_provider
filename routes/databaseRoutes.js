const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const cors = require('cors');

router.use(cors());
router.use(express.json());

router.get('/get-tables', async (req, res) => {
  try {
    const [results] = await connection.execute(`
    SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'kapture_product_db'
  `);
    res.status(200).json({ success: true, result: results });
  } catch (error) {
    console.error('Error fetching flows:', error);
    res.status(403).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/execute-query', async (req, res) => {
    try {
      const [results] = await connection.execute(`${req.body.query}`);
      res.status(200).json({ success: true, result: results });
    } catch (error) {
      console.error('Error while executing the query :', error);
      res.status(403).json({ success: false, error: 'Error while executing the query' });
    }
  });

module.exports = router;
