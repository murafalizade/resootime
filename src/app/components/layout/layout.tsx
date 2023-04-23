import React, { ReactNode } from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Layout = ({
    children,
    isRestuarantPage,
}: {
    children: ReactNode;
    isRestuarantPage?: boolean;
}) => {
    return (
        <>
            <Navbar isRestuarantPage={isRestuarantPage} />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
