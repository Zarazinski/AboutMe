const express = require('express');
const ProjectsService = require('../services/projects.service');
const auth = require('../auth/basic.auth');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await ProjectsService.getAll();
        res.send(projects);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/technologies', async (req, res) => {
    try {
        const technologiesList = await ProjectsService.getTechnologies();
        res.send({ "technologies": technologiesList });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const project = await ProjectsService.get(projectId);

        if (project) {
            res.send(project.toJSON());
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const projectCreated = await ProjectsService.create(req.body);

        if (projectCreated) {
            res.send(projectCreated.toJSON());
        } else {
            res.sendStatus(400);
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/:projectId', auth, async (req, res) => {
    const projectId = req.params.projectId;
    const project = req.body;
    project.id = projectId;

    try {
        const projectUpdated = await ProjectsService.update(project);

        if (projectUpdated) {
            res.send(projectUpdated.toJSON());
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:projectId', auth, async (req, res) => {
    const projectId = req.params.projectId;
    try {
        await ProjectsService.delete(projectId);
        res.sendStatus(204);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;