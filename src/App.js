import React from 'react';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Layout from './components/UI/Layout';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <Dashboard />
    </Layout>
  </ApolloProvider>
);

export default App;
