import gql from 'graphql-tag'

const GET_TRANSACTIONS = gql`
  query Wallet($id: ID!) {
    wallet(id: $id) {
      transactions
    }
  }
`

const GET_TRANSACTIONS_BY_ADDRESS = gql`
  query GetTransactionsByAddress($address: String!) {
    getTransactionsByAddress(address: $address) {
      id
      hash
      type
      data {
        inputs {
          amount
          address
        }
        outputs {
          amount
          address
        }
      }
    }
  }
`

const GET_TRANSACTION_BY_ID = gql`
  query GetTransactionById($id: ID!) {
    getTransactionById(id: $id) {
      id
      hash
      type
      data {
        inputs {
          amount
          address
        }
        outputs {
          amount
          address
        }
      }
    }
  }
`

const GET_UNCONFIRMED_TRANSACTIONS = gql`
  query {
    unconfirmedTransactions {
      id
      hash
      type
      data {
        inputs {
          transaction
          index
          amount
          address
          signature
        }
        outputs {
          amount
          address
        }
      }
    }
  }
`

export {
  GET_TRANSACTIONS,
  GET_UNCONFIRMED_TRANSACTIONS,
  GET_TRANSACTIONS_BY_ADDRESS,
  GET_TRANSACTION_BY_ID
}
