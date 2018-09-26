import gql from 'graphql-tag';

const BLOCK_MINED = gql`
  subscription blockMined {
    blockMined {
  	  index
      hash
    }
  }
`;

export { BLOCK_MINED };
