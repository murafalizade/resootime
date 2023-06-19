import LoginForum from '@/app/components/forms/loginForum';
import React from 'react';
import styles from '@/app/styles/Form.module.scss';
import Image from 'next/dist/client/image';
import Head from 'next/head';

const Login = () => {
    return (
        <>
            <Head>
                <title>Hesabınıza daxil olun - Resootime.com</title>
                <meta
                    name="description"
                    content="Hesabınıza özəl panelinizə daxil olun və tənzimləmələrinizi idarə edin."
                />
                <meta
                    name="keywords"
                    content="daxil ol, hesab, panel, giriş, mənim rezervasiyalarım, tənzimləmələr"
                />
                <meta
                    property="og:title"
                    content="Hesabınıza daxil olun - Resootime.com"
                />
                <meta
                    property="og:description"
                    content="Hesabınıza özəl panelinizə daxil olun və tənzimləmələrinizi idarə edin."
                />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <link rel="canonical" href="https://resootime.com/login" />
            </Head>
            <nav>
                <div className="container-fluid border-bottom">
                    <div className="navbar p-3">
                        <div>
                        <a
                            href="/"
                            className={`navbar-brand ${styles.brand_name}`}>
                            <Image
                                src={'/images/logo.png'}
                                alt="logo"
                                width={164}
                                height={34}
                                className="img-fluid logo icon nav-img"
                            />
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
