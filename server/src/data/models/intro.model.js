const mongoose = require('mongoose');
const { applyToJSON } = require('./utils/transformations');
const Schema = mongoose.Schema;

const IntroModelSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    avatar: { type: String, required: false },
}, {
    collections: 'intros'
});

applyToJSON(IntroModelSchema);

const IntroModel = mongoose.model('IntroModel', IntroModelSchema);

module.exports = IntroModel;