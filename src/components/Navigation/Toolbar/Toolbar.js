import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BurgerMenu from '../BurgerMenu/BurgerMenu'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <BurgerMenu clicked={props.openDrawer}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;