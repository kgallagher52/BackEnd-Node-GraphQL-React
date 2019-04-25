const graphql = require('graphql');
const _ = require('lodash'); // Package allows easy way to change or find data


const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Dummie Data
var books = [
    {name:"harry Potter 1", genre:"Fantasy",id:"1"},
    {name:"harry Potter 2", genre:"Fantasy",id:"2"},
    {name:"harry Potter 3", genre:"Fantasy",id:"3"},
    {name:"Diary of Ann Frank", genre:"Biography",id:"4"}
];

const BookType = new GraphQLObjectType({ // Object Type
    name: 'Book',
    fields: () => ({
        id: { type:GraphQLString },
        name: { type:GraphQLString },
        genre: { type:GraphQLString }


    })
})

const RootQuery = new GraphQLObjectType({ // Root query are the access points to graphQL
    name:'RootQueryType',
    fields: {
        book:{
            type: BookType, //Endpoint
            args: {id: { type:GraphQLString } }, // What query is expecting from frontend Req
            resolve(parent,args){ //response .then
                // Code to get data from DB or other source
                return _.find(books, { id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({ // Defining Schema
    query: RootQuery 
})