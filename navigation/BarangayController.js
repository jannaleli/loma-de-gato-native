import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import BarangayNavigator from './BarangayNavigator';
const BarangayNavigationContainer = props => {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token)

    useEffect( () => {

        if(!isAuth) {
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth' })
            );
        }

    }, [isAuth]);
}

export default BarangayNavigationContainer;