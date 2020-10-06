import React, { useEffect, useState } from 'react'
import { graphql } from 'react-apollo' //Glue that binds the component to graphql 
import { getBooksQuery } from '../queries/queries'


const BookList = ({ data }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (data.books) {
            setBooks(data.books)
        }
        return () => {
            setBooks([]);
        }

    }, [data])

    return (
        <div>
            <ul id="book-list">
                {
                    books.length > 0
                        ?
                        books.map(b => (
                            <li key={b.id}>{b.name}</li>
                        ))
                        :
                        <li>...Loading Books</li>
                }
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
