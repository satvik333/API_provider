const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const cors = require('cors');

router.use(cors());
router.use(express.json());

router.get('/get-single-api/:id', async (req, res) => {
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

router.get('/get-all-apis', async (req, res) => {
  try {
    const [results] = await connection.execute(
      'SELECT id, api_name FROM api_handler WHERE del_flag = ? AND active_flag = ?', 
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

module.exports = router;
