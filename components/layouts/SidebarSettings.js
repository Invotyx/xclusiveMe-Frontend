import { useRouter } from 'next/router';
import NextLink from 'next/link';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemSettings from './ListItemSettings';

const sidebarNavItems = [
  { url: '/settings/account', text: 'Account' },
  { url: '#', text: 'Privacy' },
  { url: '/settings/subscription', text: 'Subscription' },
  { url: '/settings/notifications', text: 'Notifications' },
  { url: '#', text: 'Earnings' },
  { url: '/settings/billing', text: 'Billing Method' },
  { url: '/settings/bank', text: 'Bank' },
];

export default function Comp() {
  const { asPath } = useRouter();
  return (
    <List>
      {sidebarNavItems.map((i, j) => (
        <NextLink href={i.url} key={`sidebarNavItems${j}`} passHref>
          <ListItemSettings component='a' selected={i.url === asPath}>
            <ListItemText primary={i.text} />
          </ListItemSettings>
        </NextLink>
      ))}
    </List>
  );
}
