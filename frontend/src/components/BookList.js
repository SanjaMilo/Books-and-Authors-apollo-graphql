import React, { Component } from 'react';
// import { graphql } from '@apollo/client/react/hoc/graphql'; // the old version
import { Query } from '@apollo/client/react/components';
import { getBooksQuery } from '../queries/queries';
import { Link } from 'react-router-dom';


class BookList extends Component {

	render() {
        // console.log(this.props) // the old version

        return(
		<Query query={getBooksQuery}>
			{({ loading, error, data }) => {
                console.log({loading, error, data});

				if (loading) return <p>Loading…</p>;
				if (error) return <p>Error :( </p>;

				return (
					<div className="book-list">
						<h1>Book List by Authors</h1>
						<ul className="book-list">
							{data.books.map(book => <Link key={book.id} to={`/details/${book.id}`}><li>{book.name}</li></Link>)}
						</ul>
					</div>
				);
			}} 
            {/* do not put ; at the end of the brackets! */}
		</Query>
        )
	}
}

export default BookList;
// export default graphql(getBooksQuery)(BookList); // the old version
