import LoginForum from '@/app/components/forms/loginForum';
import React from 'react';
import styles from '@/app/styles/Form.module.scss';
import Image from 'next/dist/client/image';

const Login = () => {
    return (
        <>
            <nav>
                <div className="container-fluid border-bottom">
                    <div className="navbar p-3">
                        <div>
                            <a href="/" className="navbar-brand">
                                <Image
                                    src={'/images/logo.png'}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    className="img-fluid mx-2 logo nav-img"
                                />
                                ResooTime
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div
                className={`${styles.form_bg} d-flex justify-content-center align-items-center`}>
                <LoginForum />
            </div>
        </>
    );
};

export default Login;
