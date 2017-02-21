import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import BooksOverview from './BooksOverview.component';
import Book from './Book.component';


// import books from './books.json';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            URL: "http://58a77311660a2412004c8056.mockapi.io/books",
            headings: {
                title: "Title",
                author: "Author",
                pageNum: "Number of pages",
                price: "Price",
                year: "Year",
                action: "Action"
            },
            fields: ['title', 'author', 'pageNum', 'price', 'year']
        };
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/"
                       component={BooksOverview} />
                <Route path="/:bookId" component={Book}
                    URL={this.state.URL} headings={this.state.headings} fields={this.state.fields}/>
                <Route path="/new" componennt={Book} headings={this.state.headings} fields={this.state.fields}/>
            </Router>
        );
    }
}

export default App;
