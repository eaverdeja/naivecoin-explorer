import gql from 'graphql-tag';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $walletId: ID!
    $password: String!
    $fromAddress: String!
    $toAddress: String!
    $amount: Float!
  ) {
    createTransaction(
      walletId: $walletId
      password: $password
      fromAddress: $fromAddress
      toAddress: $toAddress
      amount: $amount
    ) {
  	  id
    }
  }
`;

export { CREATE_TRANSACTION };
