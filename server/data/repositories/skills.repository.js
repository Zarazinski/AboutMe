const mongoose = require("mongoose");
const SkillModel = require("../models/skill.model");

module.exports = class SkillsRepository {

    static async createSkill(skill) {
        const newSkill = await SkillModel.create({ description: skill.description, level: skill.level });
        console.log(newSkill);
        return newSkill;
    }

    static async findAll() {
        const skills = await SkillModel.find({});
        console.log(skills);
        return skills;
    }
}