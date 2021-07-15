import { gql } from '@apollo/client';

export const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

export const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

// variables: add the variables after mutation() in the brackets, like so: $name: String! "!" is for required, and not null. 
// Pass those variables values into the mutation

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`;

// $id: ID -> variable must be of type ID, not String or something else

export const getBookDetailsQuery = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name 
			genre 
			author {
				id 
				name 
				age 
				books {
					name 
					id 
				}
			}
		}
	}
`;