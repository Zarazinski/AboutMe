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

export const createProject = async (project) => {
    const newProject = {
        name: project.name,
        description: project.description,
        technologies: project.technologies,
        image: project.image,
    };

    const response = await fetch(API_URL + '/projects', {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify(newProject),
    });

    return response;
};

export const deleteProject = async (projectId) => {
    const response = await fetch(API_URL + '/projects/' + projectId, {
        method: 'delete'
    });

    return response;
}