import axios from 'axios';

export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const DELETE_BOOK = 'DELETE_BOOK';

const URL = `http://58a77311660a2412004c8056.mockapi.io/books/`;


export const requestBooks =  () => ({
    type: REQUEST_BOOKS
});

export const receiveBooks = books => ({
    type: RECEIVE_BOOKS,
    books
});

export const deleteBook = id => ({
    type: DELETE_BOOK,
    id
});

export const deleteBookFromServer = id => dispatch => {
    return axios.delete(URL+id)
        .then(response => response.data)
        .then(book => dispatch(deleteBook(book.id)))
        .catch(error => console.error(error));
};

export const fetchBooks = () => dispatch => {
    dispatch(requestBooks());
    return fetch(URL)
        .then(response => response.json())
        .then(books => dispatch(receiveBooks(books)))
        .catch(error => console.error(error));
};


/*
this is state
{   isFetching: false,
    headings: {...},
    fields: {...},
    books: []
}
 */