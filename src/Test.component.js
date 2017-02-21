import React from 'react';

class Test extends React.Component {
    render() {
        let book = this.props.book;
        return (
            <div>
            {book.title} - {book.year}
            </div>
        );
    }
}

export default Test;
