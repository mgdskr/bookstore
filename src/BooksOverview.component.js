import React, { Component } from 'react';
import {Link} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class BooksOverview extends Component {
    constructor(props) {
        super(props);

        this.URL = "http://58a77311660a2412004c8056.mockapi.io/books";

        fetch(this.URL)
        .then((response)=> response.json())
        .then((books)=> {this.setState({books: books})})
        .catch(console.err);

        this.state = {
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
            fields: ['id', 'title', 'author', 'pageNum', 'price', 'year']
        };
    }


    render() {
        return (
        <MuiThemeProvider>
        <div className="books-overview">
            <div className="books-overview__headline">
                <h1 className="books-overview__title">Book list</h1>
                <RaisedButton label="add new book" primary={true} containerElement={<Link to="/new"/>}>
                </RaisedButton>
            </div>
            <Table selectable={false}>
                <TableHeader>
                    <TableRow>
                        {
                            Object.keys(this.state.headings).map((heading)=>
                                <TableHeaderColumn key={heading.toString()}>                                {this.state.headings[heading]}</TableHeaderColumn>)
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        this.state.books.map((book)=>
                            <TableRow key={book.title.toString() + Math.random()}>
                                {
                                    Object.keys(book).map((heading)=>
                                        <TableRowColumn key={heading.toString()}>{book[heading]}</TableRowColumn>)
                                }
                                <TableRowColumn>
                                    <div className="action-icons">
                                        <Link className="action-icons__item" to={`/${book.id}`}>
                                            <i className="material-icons">mode_edit</i>
                                        </Link>
                                        <i className="material-icons" onClick={this.handlerDelete.bind(this, book.id)}>delete</i>
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
        </MuiThemeProvider>
        );
    }

    componentWillMount() {}

    handlerDelete(deletedBook) {
        fetch(`${this.URL}/${deletedBook}`, {method: 'DELETE'})
        .then((response)=> response.json())
        .then((books)=> {
            this.setState({
                books: this.state.books.filter((book) => book.id !== deletedBook)
            });
            console.log(books);
        });
    }
}

export default BooksOverview;
