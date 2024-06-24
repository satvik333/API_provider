const express = require('express');
const cors = require('cors');
const usersRoute = require('./routes/usersRoutes');
const apiHandler = require('./routes/apiHandlerRoutes');
const dbRoutes = require('./routes/databaseRoutes');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use('/', usersRoute);

app.use('/api-handler', apiHandler);

app.use('/db', dbRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
