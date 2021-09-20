import React, { useState } from 'react';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { post as postData } from '../../actions/post';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: 450,
    backgroundColor: 'black',
  },

  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },

    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: 'black',
    backgroundImage: 'black',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
  },
});

const reasons = [
  {
    text: 'I dont like this post',
  },
  {
    text: 'The content is offensive or voilates "XclusiveMe" Terms of Service',
  },
  {
    text: 'This content contains stolen materal (DMCA)',
  },
  {
    text: 'This content is spam',
  },
  {
    text: 'Report Abuse',
  },
];

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      disableRipple
      color='default'
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function PostReport({ postid, handleClose }) {
  const classes = useStyles();
  const [value, setValue] = useState(['']);
  const dispatch = useDispatch();

  const handleSendReport = () => {
    dispatch(
      postData.postReport({
        reportData: {
          itemId: postid,
          reason: value,
        },
        callback: () => {
          handleClose();
        },
      })
    );
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <FormControl component='fieldset'>
          {reasons.map((r, i) => (
            <RadioGroup
              key={`abcdef${i}`}
              name='customized-radios'
              value={value}
              onChange={e => setValue(e.target.value)}
            >
              <FormControlLabel
                value={r.text}
                control={<StyledRadio />}
                label={r.text}
              />
            </RadioGroup>
          ))}
        </FormControl>
      </CardContent>

      <CardActions style={{ display: 'flex', float: 'right' }}>
        <Button
          onClick={handleClose}
          style={{ backgroundColor: 'white', color: 'black' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSendReport}
          style={{ backgroundColor: 'white', color: 'black' }}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
