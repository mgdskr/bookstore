import {REQUEST_BOOKS, RECEIVE_BOOKS, DELETE_BOOK} from '../actions/index';
import {SAVE_NEW_BOOK, SAVE_EDITED_BOOK} from '../actions/book';

const bookReducer = (state = [], action) => {
    switch (action.type) {
        case SAVE_NEW_BOOK:
            return [...state,
                action.book];
        case SAVE_EDITED_BOOK:
            return [...state.map(existingBook => {return existingBook.id === action.book.id ? action.book : existingBook})];
        default:
            return state;
    }
};

const rootReducer = (state = {isFetching: false,
    books: [],
    headings: {
        id: "ID",
        title: "Title",
        author: "Author",
        pageNum: "Number of pages",
        price: "Price",
        year: "Year",
        action: "Action"
    },
    fields: ['title', 'author', 'pageNum', 'price', 'year']},
                     action) => {
    switch (action.type) {
        case REQUEST_BOOKS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_BOOKS:
            return {
                ...state,
                books: action.books,
                isFetching: false
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.id)
            };
        case SAVE_NEW_BOOK:
        case SAVE_EDITED_BOOK:
            return {...state,
                books: bookReducer(state.books, action)};
        default:
            return state;
}
};

export default rootReducer;