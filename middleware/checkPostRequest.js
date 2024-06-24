const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const cors = require('cors');

router.use(cors());
router.use(express.json());

const checkPostRequest = async (req, res, next) => {
    try {
        if (req.method === 'POST') {
            const base64Data = req.headers.authorization;
            if (!base64Data) {
                return res.status(401).json({ success: false, message: "Missing authorization header" });
            }

            const authorization = Buffer.from(base64Data, 'base64').toString('utf8');
            const end_point = req.path.split('/').pop();

            const [results] = await connection.execute(
                'SELECT * FROM auth_service_provider WHERE end_point = ? AND authorization = ? AND del_flag = ?',
                [end_point, authorization, 0]
            );

            if (results.length === 0) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = checkPostRequest;
