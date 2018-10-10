import gql from 'graphql-tag'

const GET_ALL_BLOCKS = gql`
  query {
    blocks {
      index
      nonce
      previousHash
      timestamp
      hash
      transactions {
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
  }
`

const GET_LATEST_BLOCKS = gql`
  query {
    blocks {
      index
      nonce
      previousHash
      timestamp
      hash
      transactions {
        id
      }
    }
  }
`

const GET_BLOCK = gql`
  query getBlockByHash($hash: String!) {
    getBlockByHash(hash: $hash) {
      index
      nonce
      previousHash
      merkleRoot
      difficulty
      timestamp
      hash
      transactions {
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
  }
`

export { GET_ALL_BLOCKS, GET_LATEST_BLOCKS, GET_BLOCK }
