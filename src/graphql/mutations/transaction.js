import gql from 'graphql-tag';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($id: ID!, $password: String!) {
    createTranTransaction(id: $id, password: $password)
  }
`;

export { CREATE_TRANSACTION };
