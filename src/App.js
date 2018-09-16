import React from 'react';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Block from './containers/blockchain/Block';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/UI/Layout';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
});

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Layout>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/blocks/:blockHash" component={Block} />
      </Layout>
    </ApolloProvider>
  </Router>
);

export default App;
