import React, { useEffect } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { currentUserSelector } from '../selectors/authSelector';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../actions/auth';

export default function FormDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullName, set_fullName] = React.useState('');
  const [gender, set_gender] = React.useState('');
  const [dob, set_dob] = React.useState('');
  const [description, set_description] = React.useState('');
  const [headline, set_headline] = React.useState('');

  const currentUser = useSelector(currentUserSelector);
  useEffect(() => {
    if (currentUser && currentUser.profile) {
      set_fullName(currentUser.profile.fullName);
      set_gender(currentUser.profile.gender);
      set_dob(currentUser.profile.dob);
      set_description(currentUser.profile.description);
      set_headline(currentUser.profile.headline);
    }
  }, [currentUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    dispatch(
      auth.updateProfile({
        fullName,
        gender,
        dob,
        description,
        headline,
      })
    );
  };

  return (
    <>
      <IconButton aria-label='create' onClick={handleClickOpen}>
        <CreateIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            value={fullName}
            onChange={(e) => set_fullName(e.target.value)}
            variant='outlined'
            margin='normal'
            fullWidth
            name='fullName'
            label='Full Name'
          />
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Gender</FormLabel>
            <RadioGroup
              name='gender'
              value={gender}
              onChange={(e) => set_gender(e.target.value)}
            >
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
            </RadioGroup>
          </FormControl>
          <TextField
            value={dob}
            onChange={(e) => set_dob(e.target.value)}
            variant='outlined'
            margin='normal'
            fullWidth
            type='date'
            name='dob'
            label='Dob'
          />
          <TextField
            value={description}
            onChange={(e) => set_description(e.target.value)}
            variant='outlined'
            margin='normal'
            fullWidth
            name='description'
            label='Description'
          />
          <TextField
            value={headline}
            onChange={(e) => set_headline(e.target.value)}
            variant='outlined'
            margin='normal'
            fullWidth
            name='headline'
            label='Headline'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleUpdate} color='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
