import React from 'react';

import BookForm from './BookForm.component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Book extends React.Component {


    render () {
        const bookId = this.props.params.bookId;
        const headings = this.props.route.headings;
        const fields = this.props.route.fields;
        const URL = this.props.route.URL;
        let pageTitle;

        if (bookId !== "new") {
            pageTitle = `Book ${bookId}`;
        } else if (bookId === "new") {
            pageTitle = 'New book';
        }

        return (
            <MuiThemeProvider>
                <div className="book">
                    <h1>{pageTitle}</h1>
                    <BookForm
                        bookId={bookId}
                        URL={URL}
                        headings={headings}
                        fields={fields}
                        ></BookForm>
                </div>
            </MuiThemeProvider>

        );
    }



}
export default Book;
