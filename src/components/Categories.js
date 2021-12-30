import React, { Component } from 'react';
import BooksList from './BooksList';
import * as BooksAPI from '../BooksAPI';


class Categories extends Component {

    state = {
        books: []
    }

    //Get All Books in Main Page
    getAllBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books
            })
        })
    }

    componentDidMount() {
        this.getAllBooks();
    }

    //Update Book Shelf in Main Page
    updateBookShelf(book, shelf) {
        this.setState({ books: [] });
        BooksAPI.update(book, shelf).then((newBooks) => {
            this.getAllBooks();
        })
    }

    render() {
        const { books } = this.state;
        const { categories } = this.props;
        return (
            <div className="list-books-content">
                {categories.map((category, index) => (
                    <div className="bookshelf" key={index}>
                        <h2 className="bookshelf-title">{category.title}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.length > 0 ? books.filter(book => book.shelf === category.type).length > 0 &&
                                    books.filter(book => book.shelf === category.type).map((book, index) => (
                                        <BooksList key={index} book={book} onUpdateBookShelf={this.updateBookShelf.bind(this)} />
                                    )) : <p>Loading....</p>}
                            </ol>
                        </div>
                    </div>
                ))}
            </div>
        )

    }

}

export default Categories;