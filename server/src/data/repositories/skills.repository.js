const SkillModel = require("../models/skill.model");

module.exports = class SkillsRepository {

    static async add(skill) {
        return await SkillModel.create({
            description: skill.description,
            level: skill.level
        });
    }

    static async remove(skillId) {
        return await SkillModel.findByIdAndRemove(skillId);
    }

    static async getAll() {
        return await SkillModel.find({});
    }

    static async update(skill) {
        return await SkillModel.findByIdAndUpdate(skill._id, skill);
    }
}