const API_URL = process.env.REACT_APP_API_URL;

export const getProjects = async () => {
    const projects = await fetch(API_URL + '/projects');
    return projects;
};