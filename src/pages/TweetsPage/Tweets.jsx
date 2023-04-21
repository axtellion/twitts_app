import { Box, List, Btn, SortList, SortItem } from './Tweets.styled';
import { UserCart } from '../../components/UserCart/UserCart';
import { getUsers } from '../../components/apiService';

import { useEffect, useState } from 'react';
import { slice } from 'lodash';

import {
  RiUserFollowLine,
  RiUserUnfollowFill,
  RiDeleteBin3Line,
} from 'react-icons/ri';

export const Tweets = () => {
  const lokal = localStorage.getItem('users');
  const lokalFollower = JSON.parse(lokal);

  const [user, setUser] = useState(lokalFollower);
  const [index, setIndex] = useState(9);
  // const [sortFollow, setSortFollow] = useState('');

  const initialPosts = slice(user, 0, index);
  const array = [];

  // let piople = [];

  // const onFollow = sortFollow => {
  //   if ((sortFollow = 'show me followings')) {
  //     piople = initialPosts.map(item => {
  //       if (item.status) {
  //         return item;
  //       }
  //     });
  //   } else if ((sortFollow = 'show me follow')) {
  //     console.log(sortFollow);
  //   } else {
  //     console.log(sortFollow);
  //   }
  // };

  const loadMore = () => {
    setIndex(index + 9);
  };

  useEffect(() => {
    const users = getUsers();
    users.then(res => setUser(res));
  }, []);

  return (
    <Box>
      <SortList>
        <SortItem>
          <RiDeleteBin3Line />
        </SortItem>
        <SortItem>
          <RiUserFollowLine />
        </SortItem>
        <SortItem>
          <RiUserUnfollowFill />
        </SortItem>
      </SortList>
      <List>
        {user &&
          initialPosts.map(item => (
            <UserCart key={item.id} item={item} array={array} />
          ))}
      </List>
      {user && index <= user.length && <Btn onClick={loadMore}>Load More</Btn>}
    </Box>
  );
};
