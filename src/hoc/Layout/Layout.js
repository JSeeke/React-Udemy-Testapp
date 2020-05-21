import React, { useState } from 'react';

import Aux from '../Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(true);
    }

    return(
        <Aux>
            <Toolbar openDrawer={sideDrawerOpenHandler}/>
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler}/>
            <div> Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;