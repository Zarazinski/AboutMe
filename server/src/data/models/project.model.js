const mongoose = require('mongoose');
const { applyToJSON } = require('./utils/transformations');
const Schema = mongoose.Schema;

const ProjectModelSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: false },
    technologies: [{ type: String }],
}, {
    collections: 'projects'
});

applyToJSON(ProjectModelSchema);

const ProjectModel = mongoose.model('ProjectModel', ProjectModelSchema);

module.exports = ProjectModel;