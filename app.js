const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema');
const app = express();

//MiddleWare
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true // Saying we want to use the graphiql tool when we go to /graphql in browser
}))

app.listen(5000, () => {
    console.log("Server on port 5000")
})