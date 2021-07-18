module.exports.applyToJSON = (schema) => {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => { delete ret._id }
    });
};