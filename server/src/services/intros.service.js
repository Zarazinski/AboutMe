const IntrosRepository = require("../data/repositories/intros.repository");

module.exports = class IntrosService {
    static async getAll() {
        return await IntrosRepository.getAll();
    }

    static async get(introId) {
        return await IntrosRepository.get(introId);
    }

    static async create(intro) {
        return await IntrosRepository.add(intro);
    }

    static async update(intro) {
        return await IntrosRepository.update(intro);
    }

    static async delete(introId) {
        return await IntrosRepository.remove(introId);
    }
};