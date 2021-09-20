import NextLink from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { user } from '../actions/user';
import { suggestionsSelector } from '../selectors/userSelector';
import ImageAvatar from '../components/image-avatar';

export default function Home() {
  const dispatch = useDispatch();
  const suggestion = useSelector(suggestionsSelector);
  const pageNum = Math.floor(Math.random() * 3 + 1);
  const limit = Math.floor(Math.random() * 5 + 1);

  useEffect(() => {
    dispatch(user.requestSuggestions({ limit: limit, pageNumber: pageNum }));
  }, []);

  return (
    <>
      <Typography>Suggestions For You</Typography>
      <List>
        {suggestion?.map(
          (s, i) =>
            s?.username && (
              <ListItem key={`suggestions${i}`}>
                <ListItemAvatar>
                  <ImageAvatar src={s?.profileImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='body2'>{s.fullName}</Typography>
                  }
                  secondary={
                    <Typography variant='caption' color='textSecondary'>
                      Suggested for you
                    </Typography>
                  }
                />

                <ListItemSecondaryAction>
                  <NextLink href={`/x/${s.username}`} passHref>
                    <Link>
                      <div>
                        <Typography variant='caption'>See Profile</Typography>
                      </div>
                    </Link>
                  </NextLink>
                </ListItemSecondaryAction>
              </ListItem>
            )
        )}
      </List>
    </>
  );
}
