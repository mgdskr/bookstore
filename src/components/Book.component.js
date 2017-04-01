import React from 'react';
import BookForm from '../containers/BookForm.component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Book extends React.Component {
    render () {
        const bookId = this.props.params.bookId;
        let pageTitle = bookId !== "new" ? `Book ${bookId}` : pageTitle = 'New book';

        return (
            <MuiThemeProvider>
                <div className="book">
                    <h1>{pageTitle}</h1>
                    <BookForm bookId={bookId}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Book;