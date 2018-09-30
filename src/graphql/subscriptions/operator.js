import gql from 'graphql-tag';

const BLOCK_MINED = gql`
  subscription blockMined {
    blockMined {
  	  index
      hash
    }
  }
`;

const SERVER_LOG_UPDATE = gql`
  subscription {
    serverLogUpdate
  }
`

export { BLOCK_MINED, SERVER_LOG_UPDATE };
