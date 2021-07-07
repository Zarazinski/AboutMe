const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const skillsRouter = require('./routes/skills.route');
const { connectDatabase } = require('./data');

connectDatabase();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/skills', skillsRouter);

module.exports = app;
