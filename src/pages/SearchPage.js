import React, { Component } from "react";
import * as BooksAPI from '../BooksAPI';
import BooksList from "../components/BooksList";
import { Link } from 'react-router-dom';

let controller = null;
class SearchPage extends Component {
    state = {
        query: '',
        myBooks: [],
        books: [],
        loading: false,
    }
  
  	componentDidMount() {
        this.getMyBooks();
    }
  
  	//To fix the following warning after refreshing page: Can't perform a React state update on an unmounted component.
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    getMyBooks() {
        BooksAPI.getAll().then((myBooks) => {
            this.setState({
                myBooks
            })
        })
    }

    findBooksByTitleOrAuthor(query) {
      //To cancel pending requests when typing in search input
        if (controller) {
            controller.abort();
        }
      
        controller = new AbortController();
        const signal = controller.signal;
        const searchText = query || this.state.query;
      
      //search request has two params: searchText => query and signal => to cancel pending request later
        BooksAPI.search(searchText, signal).then((books) => {
            if (!books.error) {
                this.setState({
                    books,
                    loading: false
                })
            } else {
               //clear book array when user enters different words/letters than those which exists in search-terms file
                this.setState({ loading: false, books: [] })
            }
            controller = null;
        }).catch((err) => {
          //clear array after canceling request by controller.abort()
            console.log(err);
            this.setState({ books: [] });
        })

    }

    searchForBooks = (query) => {
        this.setState({ query: query, book: [], loading: true });
        if (query) {
            this.findBooksByTitleOrAuthor(query);
        } else {
          //cancel pending requests and empty books array
            if (controller) {
                controller.abort();
            }
            this.setState({ loading: false, books: [] })
        }
    }

    updateBookShelf(book, shelf) {
        this.setState({ books: [], loading: true });
        BooksAPI.update(book, shelf).then((newBooks) => {
            this.getMyBooks();
            this.findBooksByTitleOrAuthor();
        })
    }
  

    render() {
        const { query, books, myBooks, loading } = this.state;

        //Filter out books that have no thumbnails
        const showingBooks = books.filter(book => book.imageLinks);

        //Show book shelf if it exists in the main page (one of my books) and if it doesn't have shelf, its shelf will be none
        if (myBooks.length > 0 && showingBooks.length > 0) {
            showingBooks.forEach((book) => {
                let myBook = myBooks.find(myBook => myBook.id === book.id);
                if (myBook) {
                    book.shelf = myBook.shelf;
                } else {
                    book.shelf = 'none';
                };
            }
            )
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => { this.searchForBooks(event.target.value) }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.length > 0 && showingBooks.map((book, index) => (
                            <BooksList
                                key={index}
                                book={book}
                                onUpdateBookShelf={this.updateBookShelf.bind(this)} />
                        ))}
                    </ol>
                    {loading && (<p>Loading....</p>)}
                </div>
            </div>
        )
    }
}

export default SearchPage;