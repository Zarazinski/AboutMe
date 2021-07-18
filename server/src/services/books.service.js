const BooksRepository = require('../data/repositories/books.repository');

module.exports = class BooksService {
    static async getAll() {
        return await BooksRepository.getAll();
    }

    static async get(bookId) {
        return await BooksRepository.get(bookId);
    }

    static async create(book) {
        return await BooksRepository.add(book);
    }

    static async update(book) {
        return await BooksRepository.update(book);
    }

    static async delete(bookId) {
        return await BooksRepository.remove(bookId);
    }
};