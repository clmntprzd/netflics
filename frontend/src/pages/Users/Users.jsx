import './Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';
import { useFetchUsers } from './useFetchUsers';

function Users() {
  //const { users, usersLoadingError, fetchUsers } = useFetchUsers();
  function LogUser(id, name) {
    document.cookie = 'userid=' + id + ';';
    document.cookie = 'name=' + name + '; ';
    console.log(id);
    window.location.href = '/';
  }
  const userList = [
    { id: 1, name: 'Clement' },
    { id: 2, name: 'Melvyn' },
    { id: 3, name: 'Flavian' },
  ];
  const listUserRender = userList.map((user) => (
    <div
      className="User-Icon"
      onClick={() => LogUser(user.id, user.name)}
      key={user.id}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-user"
        style={{ color: '#ffffff' }}
        className="User-IconImg"
      />
      <div className="Username">{user.name}</div>
    </div>
  ));

  return (
    <div className="Users-container">
      <div className="Users-IconsContainer">{listUserRender}</div>
    </div>
  );
}

export default Users;
