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
        <div className="position-relative overflow-hidden">
            <Navbar isRestuarantPage={isRestuarantPage} />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
