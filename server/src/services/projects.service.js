const ProjectsRepository = require('../data/repositories/projects.repository');

module.exports = class ProjectsService {
    static async getAll() {
        return await ProjectsRepository.getAll();
    }

    static async get(projectId) {
        return await ProjectsRepository.get(projectId);
    }

    static async create(project) {
        return await ProjectsRepository.add(project);
    }

    static async update(project) {
        return await ProjectsRepository.update(project);
    }

    static async delete(projectId) {
        return await ProjectsRepository.remove(projectId);
    }
}