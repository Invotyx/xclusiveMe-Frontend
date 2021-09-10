import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { auth } from '../../../actions/auth';
import { currentUserSelector } from '../../../selectors/authSelector';
import { useSelector } from 'react-redux';

export default function AgeRestrictionListItem() {
  const dispatch = useDispatch();
  const [verificationViaSms, set_verificationViaSms] = React.useState(false);
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    if (currentUser) {
      set_verificationViaSms(currentUser.fa2);
    }
  }, [currentUser]);

  return (
    <ListItem disableGutters>
      <ListItemText primary={`Mark profile as 18+`} />
      <ListItemSecondaryAction>
        <Switch
          edge='end'
          onChange={e => {
            set_verificationViaSms(e.target.checked);
            dispatch(
              auth.updateAgeLimitRestriction({
                check: e.target.checked,
              })
            );
          }}
          checked={verificationViaSms}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
