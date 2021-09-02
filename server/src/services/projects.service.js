const ProjectsRepository = require('../data/repositories/projects.repository');

module.exports = class ProjectsService {
    static async getAll() {
        return await ProjectsRepository.getAll()
            .catch(e => {
                console.log(`The error while fetching projects: ${e}`);
                return;
            });
    }

    static async get(projectId) {
        return await ProjectsRepository.get(projectId)
            .catch(e => {
                console.log(`The error while fetching a project with id ${projectId}: ${e}`);
                return;
            });
    }

    static async create(project) {
        ProjectsService.validate(project);

        return await ProjectsRepository.add(project)
            .catch(e => {
                console.log(`The error while creating a project \n${project}:\n ${e}`);
                return;
            });
    }

    static async update(project) {
        ProjectsService.validate(project);

        return await ProjectsRepository.update(project)
            .catch(e => {
                console.log(`The error while updating a project with id \n${project}\n: ${e}`);
                return;
            });
    }

    static async delete(projectId) {
        return await ProjectsRepository.remove(projectId)
            .catch(e => {
                console.log(`The error while deleting a project with id ${projectId}: ${e}`);
                return;
            });
    }

    static validate(project) {
        if (!project.name) {
            throw new Error("Project name cannot be empty");
        }

        if (!project.description) {
            throw new Error("Project description cannot be empty");
        }

        if (!project.technologies || project.technologies.length == 0) {
            throw new Error("List of technologies cannot be empty");
        }
    }

    static async getTechnologies() {
        const allTechnologies = await ProjectsRepository.getAll();
        const uniqueTechnologies = new Set(allTechnologies.flatMap(project => project.technologies));

        return [...uniqueTechnologies];
    }
}