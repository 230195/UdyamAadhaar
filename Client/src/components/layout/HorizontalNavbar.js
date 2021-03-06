import React, {useContext, useState} from 'react';
import {NavbarContext} from '../../context/NavbarContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink, Link} from  'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {AppBar, Fab, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {drawerWidth} from './SideNavbar';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }, 
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      menuButton: {
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
  }));

  const HorizontalNavbar = () => {
    const classes = useStyles();
    const {navbar, toggleNavbar, logoutUser} = useContext(NavbarContext);
    const {isNavOpen, firstName, lastName, isUserLoggedIn} = navbar; 
    const initials = (firstName?.length > 0 ? firstName[0] : '') + (lastName?.length > 0 ? lastName[0] : '');

  
  const handleDrawerOpen = () => {
      if(isUserLoggedIn)
        toggleNavbar(true);
  };

  const logout = () => {
    logoutUser();
  }

  const menuHtml = isUserLoggedIn ? (
    <li>
    <a className="nav-link " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <Fab color="default" >
        {initials||'SP'}
      </Fab>
    </a>
    <div className="dropdown-menu dr-menu-profile" aria-labelledby="navbarDropdown">
      <a className="dropdown-item" href="#">Profile</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
    </div>
  </li>
  ) : (
    <li>
      <NavLink className="nav-link "  exact to="/signin" >Login</NavLink>
  </li>
  )
    


      return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isNavOpen,
        })}
      >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <IconButton
          color="default"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, isNavOpen && classes.hide)}
        >
          <MenuIcon  />
        </IconButton>
       
        <NavLink  to="/">
          <Typography variant="h6" color="textPrimary" noWrap>
            Udhyam Aadhaar
          </Typography>
        </NavLink>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <MenuIcon  />
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           
          </ul>
          <ul className="navbar-nav mr-auto margin-right-0">
           {menuHtml}
          </ul>
         
          
        </div>
      </nav>
      </AppBar>
      );
  }
   
  export default HorizontalNavbar;