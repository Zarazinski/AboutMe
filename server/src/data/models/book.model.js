const mongoose = require('mongoose');
const { applyToJSON } = require('./utils/transformations');

const Schema = mongoose.Schema;

const BookModelSchema = new Schema({
    description: { type: String, required: true },
    title: { type: String, required: true },
    authors: { type: String, required: true },
    readTime: { type: Date, required: true },
}, {
    collections: 'books'
});

applyToJSON(BookModelSchema);

const BookModel = mongoose.model('BookModel', BookModelSchema);

module.exports = BookModel;

