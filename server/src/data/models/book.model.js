const mongoose = require('mongoose');
const { applyToJSON } = require('./utils/transformations');

const Schema = mongoose.Schema;

const BookModelSchema = new Schema({
    title: { type: String, required: true },
    authors: { type: String, required: true },
    readDate: { type: Date, required: true },
    description: { type: String, required: false },
}, {
    collections: 'books'
});

applyToJSON(BookModelSchema);

const BookModel = mongoose.model('BookModel', BookModelSchema);

module.exports = BookModel;

