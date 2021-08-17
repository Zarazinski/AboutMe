const express = require('express');
const SkillsService = require('../services/skills.service')
const auth = require('../auth/basic.auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const skills = await SkillsService.getAll();
    res.send(skills);
});

router.post('/', auth, async (req, res) => {
    const skillCreated = await SkillsService.create(req.body);
    res.send(skillCreated.toJSON());
});

router.get('/:skillId', async (req, res, next) => {
    const skill = await SkillsService.get(req.params.skillId);

    if (!skill) {
        return next();
    }

    res.send(skill.toJSON());
});

router.put('/:skillId', auth, async (req, res) => {
    const skill = req.body
    skill.id = req.params.skillId
    const skillUpdated = await SkillsService.update(skill);
    res.send(skillUpdated.toJSON());
});

router.delete('/:skillId', auth, async (req, res) => {
    await SkillsService.delete(req.params.skillId);
    res.sendStatus(204);
});

module.exports = router;