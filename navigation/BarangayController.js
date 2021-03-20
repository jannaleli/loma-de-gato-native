import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import MainNavigator from './BarangayNavigator';

const BarangayNavigationContainer = props => {
    const navRef = useRef();
    const isAuth = false;//useSelector(state => !!state.auth.token)

    useEffect( () => {
      
        if(!isAuth) {
            console.log('enters here');
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth' })
            );
            console.log(navRef.current)
        }

    }, [isAuth]);

    return <MainNavigator ref={navRef} />
}

export default BarangayNavigationContainer;