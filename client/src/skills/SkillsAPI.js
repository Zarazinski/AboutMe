const API_URL = process.env.REACT_APP_API_URL;

export const getSkills = async () => {
    const skills = await fetch(API_URL + '/skills');
    return skills;
};