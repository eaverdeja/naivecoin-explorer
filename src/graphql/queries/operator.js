import gql from 'graphql-tag'

const SERVER_LOG = gql`
  query {
    serverLog
  }
`

export { SERVER_LOG }
