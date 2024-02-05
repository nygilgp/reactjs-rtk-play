import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers } from './userSlice';
import { useGetAllUsersQuery } from './userApiSlice';

export const UserView = () => {
  const userCount = useSelector((state) => state.user.data);
  // const dispatch = useDispatch();
  const { data, isLoading, error, isError } = useGetAllUsersQuery();
  console.log(error);
  return (
    <div>
      <h2>List of users</h2>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div>{error.error}</div>}
      {!isLoading && !isError && data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
