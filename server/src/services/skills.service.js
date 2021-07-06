const SkillsRepository = require("../data/repositories/skills.repository");

module.exports = class SkillsService {
    static async getAll() {
        return await SkillsRepository.getAll();
    }

    static async create(skill) {
        return await SkillsRepository.add(skill);
    }

    static async update(skill) {
        return await SkillsRepository.update(skill);
    }
}