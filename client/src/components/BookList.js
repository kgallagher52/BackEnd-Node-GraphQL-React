import React, { useEffect, useState } from 'react'
import { graphql } from 'react-apollo' //Glue that binds the component to graphql 
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';


const BookList = ({ data }) => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState("");

    useEffect(() => {
        if (data.books) {
            setBooks(data.books)
        }
        return () => {
            setBooks([]);
            setSelectedBook("");
        }

    }, [data])

    return (
        <div>
            <ul id="book-list">
                {
                    books.length > 0
                        ?
                        books.map(b => (
                            <li onClick={() => setSelectedBook(b.id)} key={b.id}>{b.name}</li>
                        ))
                        :
                        <li>...Loading Books</li>
                }
            </ul>
            <BookDetails id={selectedBook} />
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
