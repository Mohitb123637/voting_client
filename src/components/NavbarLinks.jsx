/* eslint-disable react/prop-types */
import { Link as RouterLink } from 'react-router-dom';
import { Navbar } from 'flowbite-react';

const NavbarLink = ({ to, children, className, ...props }) => {
  return (
    <Navbar.Link as={RouterLink} to={to} className={className} {...props}>
      {children}
    </Navbar.Link>
  );
};

export default NavbarLink;
