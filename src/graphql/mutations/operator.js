import gql from 'graphql-tag';

const MINE_BLOCK = gql`
  mutation mine($rewardAddress: String!, $feeAddress: String) {
    mine(rewardAddress: $rewardAddress, feeAddress: $feeAddress) {
      index
      hash
    }
  }
`;

export { MINE_BLOCK };
