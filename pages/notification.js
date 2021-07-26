import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Notifications from '../components/notification';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Layout from '../components/layouts/layout-auth';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  bottom: {
    top: 'auto',
    bottom: '0',
  },
  black: {
    backgroundColor: '#000',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

export default function Notification() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Container maxWidth='sm'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <Tab label='Notifications' {...a11yProps(0)} />
            <Tab label='Messages' {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <List component='div'>
              <Notifications />
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Messages
          </TabPanel>
        </Container>
      </Layout>
    </motion.div>
  );
}
