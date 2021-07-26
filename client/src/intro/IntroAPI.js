const API_URL = process.env.REACT_APP_API_URL;

export const getIntros = async () => {
    const intros = fetch(API_URL + '/intros');
    return intros;
};