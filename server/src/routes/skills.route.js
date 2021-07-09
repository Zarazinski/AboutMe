const express = require('express');
const router = express.Router();
const SkillsService = require('../services/skills.service')

router.get('/', async (req, res) => {
    const skills = await SkillsService.getAll();
    res.send(skills);
});

router.post('/', async (req, res) => {
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

router.put('/:skillId', async (req, res) => {
    const skill = req.body
    skill.id = req.params.skillId
    const skillUpdated = await SkillsService.update(skill);
    res.send(skillUpdated.toJSON());
});

router.delete('/:skillId', async (req, res) => {
    await SkillsService.delete(req.params.skillId);
    res.sendStatus(204);
});

module.exports = router;