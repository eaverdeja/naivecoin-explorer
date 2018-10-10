import gql from 'graphql-tag'

const SERVER_LOG = gql`
  query {
    serverLog
  }
`

const CONNECTED_PEERS = gql`
  query {
    connectedPeers
  }
`

export { SERVER_LOG, CONNECTED_PEERS }
