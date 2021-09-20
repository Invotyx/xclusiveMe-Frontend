import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import NextLink from 'next/link';
import PaymentIcon from '@mui/icons-material/Payment';
import BlackButton from '../../BlackButton';
import withStyles from '@mui/styles/withStyles';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  root: {
    backgroundColor: theme.palette.grey[500],
  },
  button: {
    borderRadius: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  Laterbutton: {
    borderRadius: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));

const Alert = withStyles(() => ({
  standardSuccess: {
    color: '#fff',
    backgroundColor: '#111',
  },
  icon: {
    color: '#fff !important',
  },
}))(MuiAlert);

export default function SimpleSnackbar({ open, setOpen }) {
  const bankData = [];

  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} onClose={handleClose}>
        <Alert>
          <AlertTitle>
            {bankData.length ? (
              <strong>Your Linked Account</strong>
            ) : (
              <>
                <strong>Important Notice!</strong>
                <IconButton
                  aria-label='close'
                  className={classes.closeButton}
                  onClick={handleClose}
                  size="large">
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </AlertTitle>
          {bankData.length ? (
            bankData.map((p) => (
              <ListItem
                key={p.id}
                button
                onClick={(e) => handleClickListItem(e, p.id)}
              >
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${p.title} (${p.type})`}
                  secondary={`Ending in ••${p.last4_card}`}
                />
                <ListItemSecondaryAction>
                  {p.default && (
                    <Avatar className={classes.green}>
                      <CheckIcon />
                    </Avatar>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <>
              <Box mb={2}>
                <Box>
                  <Typography>
                    You have no bank account linked to this profile.
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    To add a subscription fee to your content, please add a bank
                  </Typography>
                </Box>
              </Box>
              <NextLink href='/settings/bank' passHref>
                <Button
                  variant='contained'
                  className={classes.button}
                  endIcon={<ArrowForwardOutlinedIcon />}
                >
                  Add a bank
                </Button>
              </NextLink>
              <Box clone ml={1}>
                <BlackButton
                  onClick={handleClose}
                  variant='contained'
                  className={classes.Laterbutton}
                >
                  maybe later
                </BlackButton>
              </Box>
            </>
          )}
        </Alert>
      </Snackbar>
    </div>
  );
}
