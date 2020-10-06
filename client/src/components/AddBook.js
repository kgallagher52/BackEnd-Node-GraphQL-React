import React, { useEffect, useState } from 'react'
import { graphql } from 'react-apollo' // Glue that binds the component to graphql 
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = ({ getAuthorsQuery, addBookMutation, addBookMutationResult }) => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ id: "", name: "", genre: "" });

    useEffect(() => {
        if (getAuthorsQuery.authors) {
            setAuthors(getAuthorsQuery.authors)
        }
        return () => {
            setAuthors([]);
            setNewAuthor({ id: "", name: "", genre: "" });
        }
    }, [getAuthorsQuery])

    const submitForm = e => {
        e.preventDefault();
        addBookMutation({
            variables: {
                name: newAuthor.name,
                genre: newAuthor.genre,
                authorId: newAuthor.id
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
        setNewAuthor({ name: "", authorId: "", genre: "" });
    }

    return (
        <form onSubmit={(e) => submitForm(e)} id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input value={newAuthor.name} onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })} type="text" />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input value={newAuthor.genre} onChange={(e) => setNewAuthor({ ...newAuthor, genre: e.target.value })} type="text" />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setNewAuthor({ ...newAuthor, id: e.target.value })}>
                    <option>Select author</option>
                    {authors.length > 0
                        ?
                        authors.map(a => (
                            <option value={a.id} key={a.id}>{a.name}</option>
                        ))
                        :
                        <option>Loading Authors</option>
                    }
                </select>
            </div>
            <button>+</button>

        </form>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
