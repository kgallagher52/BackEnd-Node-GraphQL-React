const express = require('express');
const { graphqlHTTP } = require('express-graphql');// Middleware for letting express understand graphQl
const mongo = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');
const { endpoint } = require('./config');
const App = express();

// Allow cross-origin
App.use(cors())

const uri = `${endpoint}`;
mongo.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongo.connection.once('open', () => {
    console.log('connected to database');
})


App.use('/library', graphqlHTTP({
    schema,
    graphiql: true
}))

App.listen(5001, () => {
    console.log('Listening on port 5001');
})