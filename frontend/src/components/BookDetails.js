import React, { Component } from 'react';
import { getBookDetailsQuery } from '../queries/queries';
import { Query } from '@apollo/client/react/components';
import { Link } from 'react-router-dom';

class BookDetails extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    goToHomePage = () => {
        this.props.history.push("/");
    }

    render() {
        console.log(this.props.match.params) // correct book id from URL 
        
        return(
            <Query query={ getBookDetailsQuery } variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                console.log({loading, error, data});

				if (loading) return <p>Loading…</p>;
				if (error) return <p>Error :( </p>;

				return (
					<div className="book-details">
						<h2><span>Book Title:</span> {data.book.name}</h2>
                        <p><span>Genre:</span> {data.book.genre}</p>
                        <p><span>By Author:</span> {data.book.author.name}</p>
                        <h4>All books by this author:</h4>
                        <ul className="books-by-author">
                            {data.book.author.books.map(item => <Link key={item.id} to={ `/details/${item.id}`}><li>{item.name}</li></Link>)}
                        </ul>
                        <button onClick={this.goToHomePage} className="go-home">Go to Home Page</button>
					</div>
				);
			}}
            </Query>
        )
    }
    
};

export default BookDetails;
