import React from 'react';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import useStyles from './style';
import SearchBox from '../SearchBox';
import LogoutDropdown from '../LogoutDropdown';

export default function PrimarySearchAppBar({ header, categories }) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" className={classes.navColor}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">
              <a>
                <img src={header[0].logo.url} alt="logo" />
              </a>
            </Link>
          </Typography>
          <div className={classes.search}>
            <SearchBox categories={categories} />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <LogoutDropdown
              loginURL={header[0].login.url}
              iconURL={header[0].login.icon.url}
            />
            {/* <IconButton color="inherit">
            </IconButton> */}
            <IconButton color="inherit">
              <Link href={header[0].login.url}>
                <a>
                  <img src={header[0].login.icon.url} alt="login" />
                </a>
              </Link>
            </IconButton>
            <IconButton color="inherit">
              <Link href={header[0].checkout.url}>
                <a>
                  <img src={header[0].checkout.icon.url} alt="checkout" />
                </a>
              </Link>
            </IconButton>
            <IconButton color="inherit">
              {
                header[0].notification.icon
                && (
                <Link href={header[0].notification.url}>
                  <a>
                    <img src={header[0].notification.icon.url} alt="notification" />
                  </a>

                </Link>
                )
              }
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-controls={mobileMenuId}
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

PrimarySearchAppBar.propTypes = {
  header: PropTypes.objectOf(PropTypes.object).isRequired,
  categories: PropTypes.objectOf(PropTypes.object).isRequired,
};
