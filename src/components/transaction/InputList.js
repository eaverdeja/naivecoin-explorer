import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { hashResume } from '../../utils';

const inputList = ({ inputs }) => {
  return (
    <List subheader={<ListSubheader component="div">Inputs</ListSubheader>}>
      {inputs.map(input => (
        <React.Fragment key={input.address + input.transaction + input.amount}>
          <Divider light />
          <ListItem>
            <ListItemText primary={hashResume(input.address, 8)} />
            <ListItemSecondaryAction>
              <Typography variant="caption">{input.amount} NC</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default inputList;
