import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoadingError, setUsersLoadingError] = useState(null);

  const fetchUsers = () => {
    setUsersLoadingError(null);

    axios
      .get(`http://localhost:8000/users`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setUsersLoadingError('An error occured while fetching users.');
        console.error(error);
      });
  };

  // fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, usersLoadingError, fetchUsers };
}
