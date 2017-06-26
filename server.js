'use strict'
require('dotenv').config({ silent: true });
const express    = require('express');
const logger     = require('morgan');
const path       = require('path');
const bodyParser = require('body-parser');
const PORT       = process.argv[2] || process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', require('./src/index.js'));
app.use('/api/setting', require('./routes/setting.js'));
app.use('/api/quotes', require('./routes/quotes.js'));
app.use('/api/weather', require('./routes/weather.js'));


app.listen(PORT, () => console.log('server is listening on port: ', PORT));