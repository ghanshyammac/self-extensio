import React from 'react';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import useStyles from './style';

export default function LogoutDropdown({ loginURL, iconURL }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div
        className={` ${classes.username} ${(anchorEl ? ' clicked' : '')}`}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <img src={iconURL} alt="login" /> &nbsp;
        Ronald Wood
      </div>

      <Menu
        className={classes.dropdown}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleClose}>
          <strong>Hello Ronald Wood</strong>
          <span className={classes.userEmail}>Ronald.wood@mail.com</span>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleClose}>
          <Link href='/edit-profile'>Edit Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/Wishlist'>Wishlist</Link>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleClose}>
          <Link href='/logout'>Logout</Link>
        </MenuItem>
      </Menu>
    </>
  );
}

LogoutDropdown.propTypes = {
  loginURL: PropTypes.string,
  iconURL: PropTypes.string,
};
