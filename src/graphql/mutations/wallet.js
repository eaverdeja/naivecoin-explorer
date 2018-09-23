import gql from 'graphql-tag';

const CREATE_WALLET = gql`
  mutation CreateWallet($password: String!) {
    createWallet(password: $password) {
      id
    }
  }
`;

const CREATE_ADDRESS = gql`
  mutation CreateAddress($id: ID!, $password: String!) {
    createAddress(id: $id, password: $password)
  }
`;

export { CREATE_WALLET, CREATE_ADDRESS };
