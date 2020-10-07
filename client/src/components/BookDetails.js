import React, { useEffect, useState } from 'react'
import { graphql } from 'react-apollo' // Glue that binds the component to graphql 
import { getBookQuery } from '../queries/queries'

const BookDetails = ({ selectedBook, data }) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (data.book) {
            setBook(data.book)
        }
        return () => {
            setBook(null);
        }
    }, [data, selectedBook])

    return (
        book ?
            <div id="book-details">
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {book.author.books.length > 0
                        ?
                        book.author.books.map(b => (
                            <li key={b.id}>{b.name}</li>
                        ))
                        : null

                    }
                </ul>
            </div>
            :
            <div id="book-details">
                <p>Output book details!</p>
            </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.id
            }
        }
    }
})(BookDetails)

