import Router from 'next/router';
import React, { ComponentType, useEffect, useState } from 'react';
import UserService from '../api/services/userService';
import { Loading } from '../components/layout/loading';
import Cookie from '../utils/Cookie';

const withAuth = (WrappedComponent: ComponentType, isActive?: boolean) => {
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithAuth = (props: any) => {
        const [shouldRedirect, setShouldRedirect] = useState(false);

        useEffect(() => {
            const token = Cookie.get('token');
            const getInfo = async (token: string) => {
                const userData = await UserService.getUserByToken(token);
                console.log(userData)
                if (userData.is_client) {
                    setShouldRedirect(true);
                    Router.push(`http://${userData.restaurant_name}.localhost:3000/reservations`);
                }
            };
            if (token) {
                getInfo(token);
            } else {
                if (isActive) {
                    setShouldRedirect(true);
                    Router.push('/login');
                }
            }
        }, []);

        return !shouldRedirect ? <WrappedComponent {...props} /> : <Loading />;
    };
    ComponentWithAuth.displayName = `withAuth(${displayName})`;
    return ComponentWithAuth;
};

export default withAuth;
