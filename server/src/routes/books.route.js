const express = require('express');
const BooksService = require('../services/books.service');
const auth = require('../auth/basic.auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await BooksService.getAll();
    res.send(books);
});

router.post('/', auth, async (req, res) => {
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

router.put('/:bookId', auth, async (req, res) => {
    const book = req.body;
    book.id = req.params.bookId;

    const bookUpdated = await BooksService.update(book);

    res.send(bookUpdated.toJSON());
});

router.delete('/:bookId', auth, async (req, res) => {
    const bookId = req.params.bookId;
    await BooksService.delete(bookId);

    res.sendStatus(204);
});

module.exports = router;