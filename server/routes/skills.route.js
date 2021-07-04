const express = require('express');
const router = express.Router();
const SkillsService = require('../services/skills.service')

router.get('/', async (req, res) => {
    const skills = await SkillsService.getAll();
    res.send(skills);
});

router.post('/', async (req, res) => {
    const skillCreated = await SkillsService.create(req.body);
    res.send(skillCreated);
});

module.exports = router;