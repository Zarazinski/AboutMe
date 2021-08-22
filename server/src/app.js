const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const skillsRouter = require('./routes/skills.route');
const introsRouter = require('./routes/intros.route');
const booksRouter = require('./routes/books.route');
const projectsRouter = require('./routes/projects.route');
const uploadsRouter = require('./routes/uploads.route');

const { connectDatabase } = require('./data');

connectDatabase();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/skills', skillsRouter);
app.use('/intros', introsRouter);
app.use('/books', booksRouter);
app.use('/projects', projectsRouter);
app.use('/uploads', uploadsRouter);
app.use(express.static('src/public'));

module.exports = app;
