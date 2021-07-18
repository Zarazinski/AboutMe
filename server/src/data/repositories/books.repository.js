const BookModel = require('../models/book.model');

module.exports = class BooksRepository {

    static async getAll() {
        return await BookModel.find({});
    }

    static async get(bookId) {
        return await BookModel.findById(bookId);
    }

    static async add(book) {
        return await BookModel.create({
            description: book.description,
            title: book.title,
            authors: book.authors,
            readDate: book.readDate,
        });
    }

    static async remove(bookId) {
        return await BookModel.findByIdAndDelete(bookId);
    }

    static async update(book) {
        return await BookModel.findByIdAndUpdate(book.id, book);
    }
}