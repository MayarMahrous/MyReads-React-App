import React, { Component } from 'react';
import BookCard from './BookCard';

class BooksList extends Component {


    render() {
        const { book, onUpdateBookShelf } = this.props;
        return (
            <li key={book.id}>
                <BookCard book={book} selectNewShelf={onUpdateBookShelf} />
            </li>
        )
    }
}

export default BooksList;