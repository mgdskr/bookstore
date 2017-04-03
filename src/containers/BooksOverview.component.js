import React from 'react';
import {Link} from 'react-router';
import {fetchBooks, deleteBookFromServer} from '../actions';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class BooksOverview extends React.Component {

    render() {
        const {books, headings} = this.props;
        return (
        <MuiThemeProvider>
        <div className="books-overview">
            <div className="books-overview__headline">
                <h1 className="books-overview__title">Book list</h1>
                <RaisedButton
                    label="add new book"
                    primary={true}
                    containerElement={<Link to="/new"/>}
                >
                </RaisedButton>
            </div>
            <Table selectable={false}>
                <TableHeader>
                    <TableRow>
                        {
                            Object.keys(headings).map((heading)=>
                                <TableHeaderColumn key={heading.toString()}>
                                    {headings[heading]}
                                </TableHeaderColumn>)
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        books.map((book)=>
                            <TableRow key={book.title.toString() + Math.random()}>
                                {
                                    Object.keys(book).map((heading)=>
                                        <TableRowColumn
                                            key={heading.toString()}
                                        >
                                            {book[heading]}
                                        </TableRowColumn>)
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

    componentDidMount() {
        const {dispatch, books} = this.props;
        if (books.length === 0) {
            dispatch(fetchBooks())
        }
    }

    handlerDelete(id) {
        const {dispatch} = this.props;
        dispatch(deleteBookFromServer(id));
    }
}

const mapStateToProps = state => {
    const {books, headings, fields} = state;
    return {
        books,
        headings,
        fields
    };
};

export default connect(mapStateToProps)(BooksOverview);