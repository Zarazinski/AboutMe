const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillModelSchema = new Schema({
    description: { type: String, required: true },
    level: { type: Number, required: true },
}, {
    collections: 'skills'
});

SkillModelSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const SkillModel = mongoose.model('SkillModel', SkillModelSchema);

module.exports = SkillModel;