import axios from 'axios';

export const SAVE_EDITED_BOOK = 'SAVE_EDITED_BOOK';
export const SAVE_NEW_BOOK = 'SAVE_NEW_BOOK';
const URL = `http://58a77311660a2412004c8056.mockapi.io/books/`;

export const saveEditedBook = book => ({
    type: SAVE_EDITED_BOOK,
    book
});

export const saveNewBook = book => ({
    type: SAVE_NEW_BOOK,
    book
});

export const saveEditedBookToServer = book => dispatch => {
    return axios
            .put(URL + book.id, book)
            .then(response => response.data)
            .then(book => {dispatch(saveEditedBook(book));
            })
            ;
};

export const saveNewBookToServer = book => dispatch => {
    return axios
            .post(URL + '?', book)
            .then(response => response.data)
            .then(book => dispatch(saveNewBook(book)))
            .catch(error => console.error(error));
};