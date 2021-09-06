const API_URL = process.env.REACT_APP_API_URL;

export const getIntros = async () => {
    const intros = fetch(API_URL + '/intros');
    return intros;
};

export const updateIntro = async (intro) => {
    if (!intro.id) {
        throw new Error(`Updating an intro requires id! Provided intro was ${intro}`);
    }

    const id = intro.id;

    const newIntro = {
        description: intro.description,
        active: intro.active,
        avatar: intro.avatar,
        id: intro.id
    };

    const response = await fetch(API_URL + '/intros/' + id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'put',
        body: JSON.stringify(newIntro),
    });

    return response;
};

export const uploadAvatarImage = async (image) => {
    const formData = new FormData();
    formData.append("avatar", image);

    const response = await fetch(API_URL + '/uploads/avatar', {
        method: 'post',
        body: formData
    });

    return response;
};