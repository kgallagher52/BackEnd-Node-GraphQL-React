const graphql = require('graphql');
const _ = require('lodash'); // Package allows easy way to change or find data
const Book = require('../Models/book');
const Author = require('../Models/author');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull, // For Required fields
} = graphql;

const BookType = new GraphQLObjectType({ // Object Type
    name: 'Book',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        genre: { type:GraphQLString },
        author: {
            type:AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorId) // Author is coming from the Model being imported
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({ // Object Type
    name: 'Author',
    fields: () => ({ //Needs to be a function so that the code is executed when it's needed otherwise it would not know what the fields are.
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        age: { type:GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                return Book.find({authorId: parent.id}) // find is a mongoose built in function
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({ // Root query are the access points to graphQL
    name:'RootQueryType',
    fields: {
        book:{
            type: BookType, //Endpoint
            args: {id: { type:GraphQLID } }, // What query is expecting from frontend Req
            resolve(parent,args){ //response .then
                // Code to get data from DB or other source
                return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType, //Endpoint
            args: {id: { type:GraphQLID } }, // What query is expecting from frontend Req
            resolve(parent,args){ //response .then
                // Code to get data from DB or other source
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType), 
            resolve(parent,args){ //response .then
                // Code to get data from DB or other source
                return Book.find({}) // Empty object will return all
            }
        },
        authors:{
            type: new GraphQLList(AuthorType), 
            resolve(parent,args){ //response .then
                // Code to get data from DB or other source
                return Author.find({})
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save(); // Save method comes from mongoose
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args) {
                let book = new Book({ //Book is coming from the model we imported from the models
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId

                });
                return book.save(); // Save method comes from mongoose
            }
        }
    }
})

module.exports = new GraphQLSchema({ // Defining Schema
    query: RootQuery,
    mutation: Mutation
})