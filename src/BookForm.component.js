import React from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios';

class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            book: {}
        };
    }
    render() {
        const fields = this.props.fields;

        let book = this.state.book;

        if (Object.keys(book).length === 0) {
            fields.map((field) => {
                book[field] = '';
                });
        }

        return (
            <div>
                <form>
                    {fields.map((field) =>
                    <div key={field.toString()}>
                        <TextField
                            type="text"
                            hintText={field}
                            name={field}
                            value={this.state.book[field]}
                            onChange={this.handlerOnChange.bind(this)}/>
                    </div>
                    )}
                </form>
                <div className="book__buttons">
                    <RaisedButton label="save and return" primary={true} onClick={this.handlerFormSubmit.bind(this)}></RaisedButton>
                    <Link id="linkToPrevious" to="/">
                    </Link>
                    <RaisedButton label="cancel" default={true} containerElement={<Link to="/"/>}>
                    </RaisedButton>
                </div>
            </div>
        );
    }

    handlerOnChange(event) {
        const value = event.target.value;
        const field = event.target.name;
        let updatedBook = this.state.book;
        updatedBook[field] = value;
        this.setState({book: updatedBook});
    }

    handlerFormSubmit(event) {
        const bookId = this.props.bookId;
        const clickOnBtn = new Event('click', {'bubbles': true});
        const linkToPrevious = document.querySelector('#linkToPrevious');

        if (bookId === "new") {

            // axios.post(`${this.props.URL}/`, this.state.book)
            // .then((response) => {linkToPrevious.dispatchEvent(clickOnBtn);})
            // .catch(console.err);
            // });

            let data = '';

            for (let field in this.state.book) {
                if (field === 'id') continue;
                data += `&${field}=${encodeURIComponent(this.state.book[field])}`;
            }
            data = data.slice(1);

            fetch(`${this.props.URL}/?`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    // 'Content-Type': 'application/json'
                },
                body: data
            })
            .then(()=> linkToPrevious.dispatchEvent(clickOnBtn))
            .catch(console.err);

        } else {

            axios.put(`${this.props.URL}/${bookId}`, this.state.book)
            .then(()=> linkToPrevious.dispatchEvent(clickOnBtn))
            .catch(console.err);
        }
    }


    componentWillMount() {
        const bookId = this.props.bookId;

        if (bookId !== "new") {

            axios.get(`${this.props.URL}/${bookId}`)
            .then((response) => {
                this.setState({book: response.data});
            })
            .catch(console.err);
        }
    }
}

export default BookForm;
