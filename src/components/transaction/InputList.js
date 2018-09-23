import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { hashResume } from '../../utils';

const inputList = ({ inputs, txId }) => {
  return (
    <List subheader={<ListSubheader component="div">Inputs</ListSubheader>}>
      {inputs.length ? (
        inputs.map((input, index) => (
          <React.Fragment key={input.address + txId + index}>
            <Divider light />
            <ListItem>
              <ListItemText primary={hashResume(input.address, 8)} />
              <ListItemSecondaryAction>
                <Typography variant="caption">{input.amount} NC</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))
      ) : (
        <ListItem>
          <ListItemText secondary="No inputs (newly generated coins)" />
        </ListItem>
      )}
    </List>
  );
};

export default inputList;
