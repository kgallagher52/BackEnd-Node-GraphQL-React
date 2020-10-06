import React from 'react';
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5001/library'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
