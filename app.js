const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

//MiddleWare
app.use('/graphql',graphqlHTTP({
    
}))

app.listen(5000, () => {
    console.log("Server on port 5000")
})