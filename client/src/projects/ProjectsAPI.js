const API_URL = process.env.REACT_APP_API_URL;

export const getProjects = async () => {
    const projects = await fetch(API_URL + '/projects');
    return projects;
};

export const uploadProjectImage = async (image) => {
    const formData = new FormData();
    formData.append("project", image);

    const response = await fetch(API_URL + '/uploads/project', {
        method: 'post',
        body: formData
    });

    return response;
};