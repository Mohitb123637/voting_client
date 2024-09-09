import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/auth/authAction';
import { logout } from '../../store/profile/profileSlice';
import { useState } from 'react';
import LogOutModal from './LogoutModel';
import NavbarLink from './NavbarLinks';

const Header = () => {
  const { profile } = useSelector((state) => state.profile);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModelOpen, setModelOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      localStorage.removeItem('token');
      dispatch(logout());
      setModelOpen(false);
      navigate('/login');
    } catch (error) {
      console.log('Logout failed', error);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
          Voting
        </span>
        App
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..?"
          rightIcon={CiSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-12 lg:hidden" color="gray" pill>
        <CiSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <MdOutlineDarkMode />
        </Button>
        {profile ? (
          <>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => setModelOpen(true)}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/sign-up">
              <Button gradientDuoTone="purpleToBlue">Sign In</Button>
            </Link>
          </>
        )}

        <LogOutModal
          show={isModelOpen}
          onClose={() => setModelOpen(false)}
          onLogout={handleLogout}
        />

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavbarLink
          to="/"
          className={
            path === '/'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300'
          }
        >
          Home
        </NavbarLink>

        <NavbarLink
          to="/candidateList"
          className={
            path === '/candidateList'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300'
          }
        >
          List of Candidates
        </NavbarLink>
        {profile?.user.role === 'admin' ? (
          <>
            <NavbarLink
              to="/dashboard"
              className={
                path === '/dashboard'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300'
              }
            >
              Dashboard
            </NavbarLink>
          </>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
