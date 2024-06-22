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
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.get('/get-flows/:client_id', async (req, res) => {
  const clientId = req.params.client_id;
  try {
    const [results] = await connection.execute('SELECT id, flow_name, flow_json FROM react_flow WHERE client_id = ? AND del_flag = ?', [clientId, 0]);
    res.status(200).json({ success: true, result: results });
  } catch (error) {
    console.error('Error fetching flows:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.get('/get-single-flow/:client_id/:flow_id', async (req, res) => {
  const clientId = req.params.client_id;
  const flowId = req.params.flow_id;
  try {
    const [results] = await connection.execute('SELECT id, flow_name, flow_json FROM react_flow WHERE client_id = ? AND del_flag = ? AND id = ?', [clientId, 0, flowId]);
    if (results.length === 0) {
      return res.status(404).json({ success: false, error: 'Flow not found' });
    }
    res.status(200).json({ success: true, result: results[0] });
  } catch (error) {
    console.error('Error fetching flow:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/save-flow', async (req, res) => {
  try {
    const flow = req.body;
    const date = new Date();

    const [results] = await connection.execute(
      'INSERT INTO react_flow (client_id, flow_name, flow_json, last_updated_json, added_date, updated_date, active_flag) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [flow.clientId, flow.flow_name, JSON.stringify(flow.flow_json), JSON.stringify(flow.flow_json), date, date, flow.active_flag || 1]
    );

    res.status(200).json({ success: true, result: { id: results.insertId } });
  } catch (error) {
    console.error('Error saving flow:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/update-flow', async (req, res) => {
  try {
    const flow = req.body;
    const date = new Date();

    const [result] = await connection.execute('SELECT flow_json FROM react_flow WHERE id = ?', [flow.id]);

    if (result.length === 0) {
      return res.status(404).json({ success: false, error: 'Flow not found' });
    }

    const lastUpdatedJson = result[0].flow_json;
    const newFlowJson = JSON.stringify(flow.flow_json);

    await connection.execute(
      'UPDATE react_flow SET last_updated_json = ?, flow_json = ?, flow_name = ?, updated_date = ?, active_flag = 1 WHERE id = ?',
      [lastUpdatedJson, newFlowJson, flow.flow_name, date, flow.id]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error while updating flow:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.delete('/delete-flow/:flow_id', async (req, res) => {
  const flowId = req.params.flow_id;
  try {
    await connection.execute('UPDATE react_flow SET active_flag = 0, del_flag = 1 WHERE id = ?', [flowId]);
    res.status(200).json({ success: true, message: 'Successfully deleted the flow.' });
  } catch (error) {
    console.error('Error deleting flow:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
