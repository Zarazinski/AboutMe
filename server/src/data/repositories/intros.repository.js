const IntroModel = require("../models/intro.model");

module.exports = class IntrosRepository {

    static async getAll() {
        return await IntroModel.find({});
    }

    static async get(introId) {
        return await IntroModel.findById(introId);
    }

    static async add(intro) {
        return await IntroModel.create({
            description: intro.description,
            active: intro.active,
            avatar: intro.avatar,
        });
    }

    static async remove(introId) {
        return await IntroModel.findByIdAndDelete(introId);
    }

    static async update(intro) {
        return await IntroModel.findByIdAndUpdate(intro.id, intro, { new: true });
    }
};