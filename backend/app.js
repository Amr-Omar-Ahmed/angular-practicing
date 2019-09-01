const express = require('express');
const app = express();
const path = require('path');


require('./startup/routes')(app, express, path);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3200;
app.listen(port, () => console.info(`Listening on port ${port}...`));