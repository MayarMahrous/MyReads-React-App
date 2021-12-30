import React from "react";
import Categories from '../components/Categories';
import Header from "../components/header";
import { Link } from 'react-router-dom';

function MainPage(props) {

    const pageTitle = "My Reads";

    const categoriesList = [
        { title: "Currently Reading", type: 'currentlyReading' },
        { title: "Want to Read", type: 'wantToRead' },
        { title: "Read", type: 'read' },
    ]

    return (
        <div className="list-books">
            <Header title={pageTitle} />
            <Categories categories={categoriesList} />
            <div className="open-search">
               <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )

}

export default MainPage;