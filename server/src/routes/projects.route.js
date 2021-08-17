const express = require('express');
const ProjectsService = require('../services/projects.service');
const auth = require('../auth/basic.auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const projects = await ProjectsService.getAll();
    res.send(projects);
});

router.get('/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    const project = await ProjectsService.get(projectId);
    res.send(project.toJSON());
});

router.post('/', auth, async (req, res) => {
    const projectCreated = await ProjectsService.create(req.body);
    res.send(projectCreated.toJSON());
});

router.put('/:projectId', auth, async (req, res) => {
    const projectId = req.params.projectId;
    const project = req.body;
    project.id = projectId;
    const projectUpdated = await ProjectsService.update(project);
    res.send(projectUpdated.toJSON());
});

router.delete('/:projectId', auth, async (req, res) => {
    const projectId = req.params.projectId;
    await ProjectsService.delete(projectId);
    res.sendStatus(204);
});

module.exports = router;