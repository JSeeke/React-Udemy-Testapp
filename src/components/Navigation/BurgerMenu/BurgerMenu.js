import React from 'react';

import classes from './BurgerMenu.css'
import burgerMenuLogo from '../../../assets/images/burger-menu-icon.png';

const burgerMenu = (props) => (
    <div className={classes.BurgerMenu}>
        <img 
            src={burgerMenuLogo} 
            onClick={props.clicked}>   
        </img>
    </div>
);

export default burgerMenu;