const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/Book');
const Author = require('../models/Author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// GraphQLNonNull -> not to accept a null value for certain fields, a certain field is required (for example, if we add author, must be all relevant data, like the name and the age. Missing name or age will be not sufficient data for adding new author to the list of authors)

// // Dummy Data: (latter on, this will be in the MongoDM database, using graphiql mutation)

// let books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
// ];

// let authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];

// define a new object types

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		// Type Relations (associating an Author with the Book)
		author: {
			type: AuthorType,
			resolve(parent, args) {
				console.log(parent);
				// using the Dummy data:
				// return _.find(authors, { id: parent.authorId }) // the parent object is the book

				// instead of local array, we use Author model form: const Author = require('../models/Author');
				return Author.findById(parent.authorId);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		// Type Relations (associating an Books with the Author, which books are by the author)
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// using the Dummy data:
				// return _.filter(books, { authorId: parent.id}) // the parent object is the author

				// instead of local array, we use Book model form: const Book = require('../models/Book'); to find all records by certain criteria placed inside the object 
				return Book.find({ authorId: parent.id })
			}
		}
	})
});


// Define a root queries (how we describe how a user can jump into the graph and grab data)

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		// book -> naming is important
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// args.id
				// code to get data from database or other source
				console.log(typeof args.id); // outputs: string
				// using the Dummy data:
				// return  _.find(books, { id: args.id }); // books is the array from the Dummy Data above

				return Book.findById(args.id)
			}
		}, 
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// using the Dummy data:
				// return _.find(authors, { id: args.id })

				return Author.findById(args.id)
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return Book.find({});
				// using the Dummy data:
				// return books

				return Book.find({}) // empty object for all
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// using the Dummy data:
				// return authors

				return Author.find({}) // empty object for all
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				// name: { type: GraphQLString },
				// age: { type: GraphQLInt }

				// these fields are all required and cannot be null:
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				// name: { type: GraphQLString },
				// genre: { type: GraphQLString },
				// authorId: { type: GraphQLID }

				// these fields are all required and cannot be null:
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
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
