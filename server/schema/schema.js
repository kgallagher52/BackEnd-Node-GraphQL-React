const graphql = require('graphql');
const Book = require('../models/book')
const Author = require('../models/author')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ // When having multiple types we want to return object of types in a function 
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({ // When having multiple types we want to return object of types in a function 
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType), // Adding the ability to get all books that belong to an author
            resolve(parent, args) {
                return Book.find({ authorId: parent.id })
            }
        }
    })
});

// Root queries

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { // Options
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({}) // using find method with not criteria returns all
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({}) // using find method with not criteria returns all
            }
        },
        book: {
            type: BookType, // Use the type we made up top
            args: { id: { type: GraphQLID } }, // Expecting a id string to be sent with this
            resolve(parent, args) { // Resolve will be what we do when handling this query
                // Code to get data from DB / other source
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id)
            }

        }
    }// Don't need to worry about the order thats why we are not in a function
})
// FrontEnd it would look something like this ex:  book(id:"123"){name genre}

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        },
    }
})

module.exports = new GraphQLSchema({ // Exporting our query we made
    query: RootQuery,
    mutation: Mutation
})