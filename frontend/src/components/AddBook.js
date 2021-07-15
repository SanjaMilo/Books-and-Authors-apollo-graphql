import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/client/react/components';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: ''
		};
	}

	handleInputChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	submitForm = (e, addBook) => {
		e.preventDefault();
		console.log(this.state);

		addBook({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId
			},
			refetchQueries: [ { query: getBooksQuery } ]
		});

		this.setState({
			name: '',
			genre: '',
			authorId: ''
		});
	};

	// Re-fetching queries: (updating the cache) After adding new book to the list of books, using mutation, we need to re-fetch the updated book list and re-render the updated book list (we show the book list with the query getBooksQuery, so we need to import it). in the refetchQueries we pass an array of all queries we want to update after the mutation

	render() {
		return (
			<Mutation mutation={addBookMutation}>
				{(addBook, { data, loading, error }) => (
					<div className="add-book">
						<h2>Add new book to the list:</h2>
						<form onSubmit={(e) => {this.submitForm(e, addBook)}}>
							<div className="form-field">
								<label htmlFor="">Book name:</label>
								<input
									name="name"
									value={this.state.name}
									onChange={(e) => this.handleInputChange(e)}
									type="text"
								/>
							</div>
							<div className="form-field">
								<label htmlFor="">Genre:</label>
								<input
									name="genre"
									value={this.state.genre}
									onChange={(e) => this.handleInputChange(e)}
									type="text"
								/>
							</div>
							<div className="form-field">
								<label htmlFor="">Author:</label>
								<select name="authorId" onChange={(e) => this.handleInputChange(e)}>
									<option value="Select author">Select author</option>
									<Query query={getAuthorsQuery}>
										{({ loading, error, data }) => {
											console.log({ loading, error, data });

											if (loading) return <option disabled>Loading authors...</option>;
											if (error) return null;
											return (
												<React.Fragment>
													{data.authors.map((author) => (
														<option key={author.id} value={author.id}>
															{author.name}
														</option>
													))}
												</React.Fragment>
											);
										}}
									</Query>
								</select>
							</div>
							<button type="submit">+</button>
						</form>
					</div>
				)}
			</Mutation>
		);
	}
}

export default AddBook;
