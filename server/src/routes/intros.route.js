const express = require('express');
const IntroService = require('../services/intros.service');
const auth = require('../auth/basic.auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const intros = await IntroService.getAll();
    res.send(intros);
});

router.post('/', auth, async (req, res) => {
    const newIntro = req.body;
    const introCreated = await IntroService.create(newIntro);
    res.send(introCreated.toJSON());
});

router.get('/:introId', async (req, res, next) => {
    const intro = await IntroService.get(req.params.introId);

    if (!intro) {
        return next();
    }

    res.send(intro.toJSON());
});

router.put('/:introId', auth, async (req, res) => {
    const intro = req.body;
    intro.id = req.params.introId;
    const introUpdated = await IntroService.update(intro);

    res.send(introUpdated.toJSON());
});

router.delete('/:introId', auth, async (req, res) => {
    const introId = req.params.introId;
    await IntroService.delete(introId);

    res.sendStatus(204);
});

module.exports = router;