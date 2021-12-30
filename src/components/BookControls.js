import React, { Component } from "react";

class BookControls extends Component {
    updateBookShelf(shelf) {
        const updatedShelf = shelf;
            this.props.selectNewShelf(this.props.book, updatedShelf);
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(event) => this.updateBookShelf(event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>

        )
    }

}

export default BookControls;