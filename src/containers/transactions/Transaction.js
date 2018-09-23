import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import Typography from '@material-ui/core/Typography/Typography';
import TransactionSummary from '../../components/transaction/TransactionSummary';
import TransactionDetails from '../../components/transaction/TransactionDetails';
import Panel from '../../components/UI/Panel';

const transaction = ({ match, history }) => (
  <Query
    query={Queries.GET_TRANSACTION_BY_ID}
    variables={{ id: match.params.transactionId }}
  >
    {({ loading, error, data }) => {
      let transaction = (
        <Typography>Transaction not found or not confirmed</Typography>
      );

      console.log(data);
      if (!loading && !error && data) {
        transaction = (
          <React.Fragment>
            <TransactionDetails transaction={data.getTransactionById} />
            <Panel title="Summary">
              <TransactionSummary
                history={history}
                transaction={data.getTransactionById}
              />
            </Panel>
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          <Typography variant="display1" align="center">
            Transaction
          </Typography>
          {transaction}
        </React.Fragment>
      );
    }}
  </Query>
);

export default transaction;
