const API_URL = process.env.REACT_APP_API_URL;

export const getSkills = async () => {
    const skills = await fetch(API_URL + '/skills');
    return skills;
};

export const addSkill = async (skill) => {
    const newSkill = {
        name: skill.name,
        description: skill.description,
        level: skill.level,
        iconName: skill.iconName,
    };

    const createdSkill = await fetch(API_URL + '/skills', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
    });

    return createdSkill;
};

export const deleteSkill = async (skillId) => {
    const response = await fetch(API_URL + '/skills/' + skillId, {
        method: 'delete'
    });

    return response;
};