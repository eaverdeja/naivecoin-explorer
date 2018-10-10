import React from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Wallets from './pages/Wallets'
import Wallet from './pages/Wallet'
import Address from './pages/Address'
import Operator from './pages/Operator'
import Transaction from './containers/transactions/Transaction'
import Block from './containers/blockchain/Block'
import Layout from './components/UI/Layout'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'

const server = process.env.REACT_APP_GRAPHQL_SERVER || 'localhost'
const wsurl = `ws://${server}:8000/graphql`
const httpurl = `http://${server}:8000/graphql`

const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true
  }
})
const httpLink = new HttpLink({
  uri: httpurl
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Layout>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/wallets" component={Wallets} />
        <Route exact path="/wallets/:walletId" component={Wallet} />
        <Route exact path="/address/:address/details" component={Address} />
        <Route exact path="/blocks/:blockHash" component={Block} />
        <Route
          exact
          path="/transactions/:transactionId"
          component={Transaction}
        />
        <Route exact path="/operator" component={Operator} />
      </Layout>
    </ApolloProvider>
  </Router>
)

export default App
