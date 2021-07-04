const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillModelSchema = new Schema({
    description: { type: String, required: true },
    level: { type: Number, required: true },
}, {
    collections: 'skills'
});

const SkillModel = mongoose.model('SkillModel', SkillModelSchema);

module.exports = SkillModel;