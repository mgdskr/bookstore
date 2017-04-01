import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import BooksOverview from '../containers/BooksOverview.component';
import Book from '../components/Book.component';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/"
                       component={BooksOverview}>
                    <IndexRoute component={BooksOverview}/>
                </Route>
                <Route path=":bookId" component={Book}/>
                <Route path="new" component={Book}/>
            </Router>
        );
    }
}

export default App;
