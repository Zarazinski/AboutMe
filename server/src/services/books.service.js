const BooksRepository = require('../data/repositories/books.repository');

module.exports = class BooksService {
    static async getAll() {
        return await BooksRepository.getAll()
            .catch(e => {
                console.log(`The error while getting books: ${e}`);
                return;
            });
    }

    static async get(bookId) {
        return await BooksRepository.get(bookId)
            .catch(e => {
                console.log(`The error while getting a book ${bookId}: ${e}`);
                return;
            });
    }

    static async create(book) {
        BooksService.validate(book);

        return await BooksRepository.add(book)
            .catch(e => {
                console.log(`The error while creating a book ${book}: ${e}`);
                return;
            });
    }

    static async update(book) {
        BooksService.validate(book)

        return await BooksRepository.update(book)
            .catch(e => {
                console.log(`The error while updating a book ${book}: ${e}`);
                return;
            });
    }

    static async delete(bookId) {
        return await BooksRepository.remove(bookId).catch(e => {
            console.log(`The error while deleting a book ${bookId}: ${e}`);
            return;
        });;
    }

    static validate(book) {
        if (!book.title) {
            throw new Error("Book title cannot be empty");
        }

        if (!book.authors) {
            throw new Error("Book authors cannot be empty");
        }

        if (!book.readDate) {
            throw new Error("Book read date cannot be empty");
        }
    }
};