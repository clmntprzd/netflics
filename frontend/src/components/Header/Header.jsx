import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../netflicslogo.ico';
const Header = () => {
  function getCookieValue(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
  }
  console.log('Test du cookie');

  const username = getCookieValue('name');
  if (username == undefined && window.location.pathname != '/users') {
    window.location.href = '/users';
  }
  console.log(username);

  return (
    <div className="NavBar-container">
      <div className="Header-container">
        <Link className="Link" to="/">
          <img className="logonetflics" src={logo} alt="Logo"></img>
        </Link>
        <div>|</div>
        <Link className="Link" to="/recommendation">
          <FontAwesomeIcon
            icon="fa-solid fa-ticket-alt"
            style={{ color: '#ffffff' }}
          />
        </Link>
        <div>|</div>
        <Link className="Link" to="/search">
          <FontAwesomeIcon
            icon="fa-solid fa-search"
            style={{ color: '#ffffff' }}
          />
        </Link>
        <div>|</div>
        <Link className="Link" to="/liked">
          <FontAwesomeIcon
            icon="fa-solid fa-heart"
            style={{ color: '#ffffff' }}
          />
        </Link>

        <div>|</div>
        <Link className="Link" to="/users">
          <FontAwesomeIcon
            icon="fa-solid fa-user"
            style={{ color: '#ffffff' }}
          />
        </Link>
        <div>|</div>

        <Link className="Link" to="/about">
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            style={{ color: '#ffffff' }}
          />
        </Link>
      </div>
      <div className="userName">{username}</div>
    </div>
  );
};

export default Header;
