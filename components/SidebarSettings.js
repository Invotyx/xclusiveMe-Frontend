import { useRouter } from 'next/router';
import NextLink from 'next/link';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSettings from './ListItemSettings';

const sidebarNavItems = [
  { url: '/settings/account', text: 'Account' },
  { url: '#', text: 'Privacy' },
  { url: '#', text: 'Subscriptions' },
  { url: '#', text: 'Notifications' },
  { url: '#', text: 'Earnings' },
  { url: '/settings/billing', text: 'Card' },
  { url: '#', text: 'Bank' },
];

export default function Comp() {
  const { asPath } = useRouter();
  return (
    <List>
      {sidebarNavItems.map((i, j) => (
        <NextLink href={i.url} key={`sidebarNavItems${j}`}>
          <ListItemSettings component='a' selected={i.url === asPath}>
            <ListItemText primary={i.text} />
          </ListItemSettings>
        </NextLink>
      ))}
    </List>
  );
}
