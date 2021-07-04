const SkillsRepository = require("../data/repositories/skills.repository");

module.exports = class SkillsService {
    static async getAll() {
        return await SkillsRepository.findAll();
    }

    static async create(skill) {
        return await SkillsRepository.createSkill(skill);
    }
}