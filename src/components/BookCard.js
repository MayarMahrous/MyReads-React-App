import React from "react";
import BookControls from "./BookControls";

function BookCard(props) {
    const { book } = props;
    
    return (
        <div className="book">
            <div className="book-top">
                {book.hasOwnProperty('imageLinks') && <div className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                </div>}
                <BookControls book={book} selectNewShelf={props.selectNewShelf}/>
            </div>
            <div className="book-title">{book.title}</div>
            {book.hasOwnProperty('authors') && book.authors.length > 0 && book.authors.map((author, index) => (
                <div className="book-authors" key={index}>{author}</div>
            ))}
        </div>
    )
}

export default BookCard;