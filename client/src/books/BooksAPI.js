const API_URL = process.env.REACT_APP_API_URL;

export const getBooks = async () => {
    const books = await fetch(API_URL + "/books");
    return books;
};