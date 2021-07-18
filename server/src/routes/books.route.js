const express = require('express');
const router = express.Router();
const BooksService = require('../services/books.service');

router.get('/', async (req, res) => {
    const books = await BooksService.getAll();
    res.send(books);
});

router.post('/', async (req, res) => {
    const newBook = req.body;
    const bookCreated = await BooksService.create(newBook);
    res.send(bookCreated.toJSON());
});

router.get('/:bookId', async (res, req, next) => {
    const book = await BooksService.get(req.params.bookId);

    if (!book) {
        return next();
    }

    res.send(book.toJSON());
});

router.put('/:bookId', async (req, res) => {
    const book = req.body;
    book.id = req.params.bookId;

    const bookUpdated = await BooksService.update(book);

    res.send(bookUpdated.toJSON());
});

router.delete('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    await BooksService.delete(bookId);

    res.sendStatus(204);
});

module.exports = router;