const express = require('express');
const cors = require('cors');
const usersRoute = require('./routes/usersRoutes');
const apiHandler = require('./routes/apiHandlerRoutes');

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json());

app.use('/', usersRoute);

app.use('/api-handler', apiHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
