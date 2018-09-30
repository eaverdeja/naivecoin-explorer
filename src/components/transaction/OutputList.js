import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { hashResume } from '../../utils';

const outputList = ({ txId, outputs }) => {
  return (
    <List subheader={<ListSubheader component="div">Outputs</ListSubheader>}>
      {outputs.map((output, index) => (
        <React.Fragment key={output.address + txId + index}>
          <Divider light />
          <ListItem>
            <ListItemText primary={hashResume(output.address, 8)} />
            <ListItemSecondaryAction>
              <Typography variant="caption">{output.amount} NC</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default outputList;
