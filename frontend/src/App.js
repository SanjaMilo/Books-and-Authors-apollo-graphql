import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BookList from './components/BookList';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';

const errorLink = onError(({ graphqlErrors, networkError }) => {
	if (graphqlErrors) {
		graphqlErrors.map(({ message, location, path }) => {
			return alert(`GraphQL error ${message}`);
		});
	}
});

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

const link = from([ errorLink, new HttpLink({ uri: GRAPHQL_ENDPOINT }) ]);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div className="App">
					<Router>
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<React.Fragment>
										<BookList {...props} />
										<AddBook {...props} />
									</React.Fragment>
								)}
							/>
							<Route path="/details/:id" component={BookDetails} />
						</Switch>
					</Router>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
