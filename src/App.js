import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Wallets from './pages/Wallets';
import Wallet from './pages/Wallet';
import Address from './pages/Address';
import Operator from './pages/Operator';
import Transaction from './containers/transactions/Transaction';
import Block from './containers/blockchain/Block';
import Layout from './components/UI/Layout';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
});

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Layout>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/wallets" component={Wallets} />
        <Route exact path="/wallets/:walletId" component={Wallet} />
        <Route exact path="/address/:address/details" component={Address} />
        <Route exact path="/blocks/:blockHash" component={Block} />
        <Route exact path="/transactions/:transactionId" component={Transaction} />
        <Route exact path="/operator" component={Operator} />
      </Layout>
    </ApolloProvider>
  </Router>
);

export default App;
