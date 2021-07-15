const express = require('express');
const { graphqlHTTP } = require('express-graphql'); // this must be in {} not to crash the server app
const schema = require('./schema/Schema');
const mongoose = require('mongoose');
const cors = require('cors');

// 'mongodb+srv://SanjaM100:SanjaM100@cluster0.6es5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// myFirstDatabase smeni go so books-and-authors
// Vo MongDB database se dodava dokument - listata so naziv 'authors' i 'books' vo mnozina od models mongoose Schema 'Author' i 'Book'

const connectDB = async () => {
  try {
      const conn = await mongoose.connect('mongodb+srv://SanjaM100:SanjaM100@cluster0.6es5j.mongodb.net/books-and-authors?retryWrites=true&w=majority', {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`); // added color cyan
  } catch (error) {
      console.log(`Error: ${error.message}`); // added color red
      process.exit(1) // 1 means exit with failure 
  }
};

connectDB();

const app = express();

// allow cross-origin-requests  (To make fetch from one server - frontend localhost:3000 to another server - backend localhost:4000/graphql, must unblock CORS policy to pass access control check and allow cross-origin-requests)
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // to use the graphigl tool for testing queries
    // open in browser http://localhost:4000/graphql
  }));

app.listen(4000, () => {
    console.log('Server running on port 4000...')
});