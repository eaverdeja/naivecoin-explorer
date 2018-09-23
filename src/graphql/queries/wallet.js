import gql from 'graphql-tag';

const GET_WALLETS = gql`
  query {
    wallets {
      id
    }
  }
`;

const GET_ADDRESSES = gql`
  query getAddresses($id: ID!) {
    wallet(id: $id) {
      addresses
    }
  }
`;

const GET_ADDRESS_SUMMARY = gql`
query getAddressSummary($address: String!) {
  getAddressSummary(address: $address) {
    balance
    totalSent
    totalReceived
    unspentOutputs {
      amount
      address
    }
  }
}
`

export { GET_WALLETS, GET_ADDRESSES, GET_ADDRESS_SUMMARY }
