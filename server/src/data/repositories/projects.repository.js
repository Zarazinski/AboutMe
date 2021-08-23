const ProjectModel = require('../models/project.model');

module.exports = class ProjectsRepository {
    static async getAll() {
        return await ProjectModel.find({});
    }

    static async get(projectId) {
        return await ProjectModel.findById(projectId);
    }

    static async add(project) {
        return await ProjectModel.create({
            name: project.name,
            description: project.description,
            link: project.link,
            technologies: project.technologies,
            image: project.image,
        });
    }

    static async remove(projectId) {
        return await ProjectModel.findByIdAndRemove(projectId);
    }

    static async update(project) {
        return await ProjectModel.findByIdAndUpdate(project.id, project);
    }
}