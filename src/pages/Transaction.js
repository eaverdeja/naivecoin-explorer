import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../graphql/queries';
import Typography from '@material-ui/core/Typography/Typography';
import TransactionSummary from '../components/transaction/TransactionSummary';
import TransactionDetails from '../components/transaction/TransactionDetails';
import Panel from '../components/UI/Panel';

const transaction = ({ match, history }) => console.log(match) || (
  <Query
    query={Queries.GET_TRANSACTION_BY_ID}
    variables={{ id: match.params.transactionId }}
  >
    {({ loading, error, data }) => console.log(loading, error, data) || (
      !loading && !error &&
      <React.Fragment>
        <Typography variant="display1" align="center">
          Transaction
        </Typography>
        <TransactionDetails transaction={data.getTransactionById} />
        <Panel title="Summary">
          <TransactionSummary history={history} transaction={data.getTransactionById} />
        </Panel>
      </React.Fragment>
    )}
  </Query>
);

export default transaction;
