const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema');
const app = express();

//MiddleWare
app.use('/graphql',graphqlHTTP({
    schema
}))

app.listen(5000, () => {
    console.log("Server on port 5000")
})