import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {saveEditedBookToServer, saveNewBookToServer} from '../actions/book';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class BookForm extends React.Component {
    render() {
        const {books, fields, bookId} = this.props;
        let book = {};
        book = bookId === "new"
            ? fields.map(field => {book[field] = '';})
            : books.filter(book => book.id === bookId)[0];
        return (
            <div>
                <form>
                    {fields.map((field) =>
                    <div key={field.toString()}>
                        <TextField
                            id={field}
                            type="text"
                            hintText={field}
                            name={field}
                            defaultValue={book[field]}
                            onChange={this.handlerOnChange.bind(this)}/>
                    </div>
                    )}
                </form>
                <div className="book__buttons">
                    <RaisedButton
                        label="save and return"
                        primary={true}
                        onClick={this.handlerFormSubmit.bind(this)}
                        containerElement={<Link to="/"/>}>
                    </RaisedButton>
                    <RaisedButton label="cancel" default={true} containerElement={<Link to="/"/>}>
                    </RaisedButton>
                </div>
            </div>
        );
    }

    handlerOnChange(event) {
        // const value = event.target.value;
        // const field = event.target.name;
        // let updatedBook = this.state.book;
        // updatedBook[field] = value;
        // this.setState({book: updatedBook});
    }

    handlerFormSubmit() {
        const {dispatch, bookId, fields} = this.props;
        let book = {
            id: bookId
        };
        fields.map(field => {book[field] = document.querySelector(`#${field}`).value});

        if (bookId === "new") {
            dispatch(saveNewBookToServer(book))
            .catch(error => console.error(error));

        } else {
            dispatch(saveEditedBookToServer(book))
            .catch(error => console.error(error));
        }
    }
}

const mapStateToProps = (state) => {
    const {books, fields} = state;
    return {
        books,
        fields
    };
};


export default connect(mapStateToProps)(BookForm);