import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../firebase/api/db';
import styles from './UsersPage.module.scss';
import { selectUsersIds } from '../../redux/users/usersSlice';
import React from 'react';
import { UserCard } from './UserCard';

export function Users() {
  const dispatch = useDispatch();
  const usersIds = useSelector(selectUsersIds);

  React.useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);

  if (!usersIds) {
    return <>Loading...</>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h1 className={styles.h1}>Users</h1>
      </div>
      <div className={styles.usersContainer}>
        {usersIds.map((id) => (
          <UserCard key={id} userId={id} />
        ))}
      </div>
    </div>
  );
}
