const express = require('express');
const BooksService = require('../services/books.service');
const auth = require('../auth/basic.auth');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await BooksService.getAll();
        res.send(books);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const newBook = req.body;
        const bookCreated = await BooksService.create(newBook);
        res.send(bookCreated.toJSON());
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:bookId', async (req, res, next) => {
    try {
        const book = await BooksService.get(req.params.bookId);

        if (!book) {
            return res.sendStatus(404);
        }

        res.send(book.toJSON());
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/:bookId', auth, async (req, res) => {
    try {
        const book = req.body;
        book.id = req.params.bookId;

        const bookUpdated = await BooksService.update(book);

        res.send(bookUpdated.toJSON());
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:bookId', auth, async (req, res) => {
    try {
        const bookId = req.params.bookId;
        await BooksService.delete(bookId);

        res.sendStatus(204);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;