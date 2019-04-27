const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const schema = require('./schemas/schema');
const cors = require('cors');

const app = express();

// Allow cross-origin requests
app.use(cors());

dotenv.config();

mongoose.connect(process.env.DB,{ useNewUrlParser: true })
mongoose.connection.once('open', () =>{
    console.log("Connected to database");
})

//MiddleWare
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true // Saying we want to use the graphiql tool when we go to /graphql in browser
}))

app.listen(5000, () => {
    console.log("Server on port 5000")
})