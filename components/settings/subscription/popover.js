import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import NextLink from 'next/link';
import PaymentIcon from '@material-ui/icons/Payment';
import { withStyles } from '@material-ui/core/styles';

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
  },
  Laterbutton: {
    borderRadius: '10px',
    paddingLeft: '20px',
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

export default function SimplePopover({ open, setOpen }) {
  const bankData = [];

  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Popover
        open={open}
        anchorReference='anchorPosition'
        anchorPosition={{ top: 600, left: 400 }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
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
                >
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
                <Button
                  onClick={handleClose}
                  variant='contained'
                  className={classes.Laterbutton}
                >
                  maybe later
                </Button>
              </Box>
            </>
          )}
        </Alert>
      </Popover>
    </div>
  );
}
