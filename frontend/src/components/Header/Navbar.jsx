
import { useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Navbar = ({ navOpen }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation(); // <-- this detects the current route
  const lastActiveLink = useRef();
  const activeBox = useRef();

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  const initActiveBox = () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink && activeBox.current) {
      activeBox.current.style.top = activeLink.offsetTop + 'px';
      activeBox.current.style.left = activeLink.offsetLeft + 'px';
      activeBox.current.style.width = activeLink.offsetWidth + 'px';
      activeBox.current.style.height = activeLink.offsetHeight + 'px';
    }
  };

  useEffect(() => {
    initActiveBox();
    window.addEventListener('resize', initActiveBox);
    return () => window.removeEventListener('resize', initActiveBox);
  }, [location.pathname]); // run on route change

  const navItems = [
    { label: 'Home', link: '/' },
    { label: 'WatchList', link: '/watchlist' },
    { label: 'Completed', link: '/completed' },
    { label: 'SignUp', link: '/signup' },
    { label: 'SignIn', link: '/signin' },
  ];

  return (
    <nav className={`navbar ${navOpen ? 'active' : ''}`}>
      {navItems.map(({ label, link }, key) => {
        if ((label === 'SignUp' || label === 'SignIn') && isLoggedIn) return null;

        const isActive = location.pathname === link;
        return (
          <Link
            key={key}
            to={link}
            className={`nav-link ${isActive ? 'active' : ''}`}
            onClick={initActiveBox}
            ref={isActive ? lastActiveLink : null}
          >
            {label}
          </Link>
        );
      })}

      {isLoggedIn && (
        <Link
          className="logout"
          onClick={logout}
          to='/'
        >
          Logout
        </Link>
      )}

      <div className="active-box" ref={activeBox} />
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
