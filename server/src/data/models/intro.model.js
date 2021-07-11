const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntroModelSchema = new Schema({
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
}, {
    collections: 'intros'
});

IntroModelSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { delete ret._id }
});

const IntroModel = mongoose.model('IntroModel', IntroModelSchema);

module.exports = IntroModel;