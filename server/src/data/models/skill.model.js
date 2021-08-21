const mongoose = require('mongoose');
const { applyToJSON } = require('./utils/transformations');
const Schema = mongoose.Schema;

const SkillModelSchema = new Schema({
    description: { type: String, required: true },
    level: { type: Number, required: true },
    iconName: { type: String, required: false },
}, {
    collections: 'skills'
});

applyToJSON(SkillModelSchema);

const SkillModel = mongoose.model('SkillModel', SkillModelSchema);

module.exports = SkillModel;