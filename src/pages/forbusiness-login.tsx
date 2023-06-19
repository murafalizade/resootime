import BusinessForum from '@/app/components/forms/businessForum';
import React from 'react';
import styles from '@/app/styles/Form.module.scss';
import Image from 'next/dist/client/image';
import Head from 'next/head';

const ForBusinessLogin = () => {
    return (
        <>
            <Head>
                <title>
                    Restoran sahibi olaraq qeydiyyatdan keçin - resootime.com
                </title>
                <meta
                    name="description"
                    content="Resootime.com saytına restoran sahibi olaraq qeydiyyatdan keçin və öz restoranınızın panelini yaradın."
                />
                <meta
                    name="keywords"
                    content="restoran sahibi ol, restoran, panel"
                />
                <meta
                    property="og:title"
                    content="Restoran sahibi olaraq qeydiyyatdan keçin - Resootime.com"
                />
                <meta
                    property="og:description"
                    content="Resootime.com saytına restoran sahibi olaraq qeydiyyatdan keçin və öz restoranınızın panelini yaradın."
                />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/register-page-image.png"
                />
                <link
                    rel="canonical"
                    href="https://resootime.com/register-restaurant-owner"
                />
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
                <BusinessForum />
            </div>
        </>
    );
};

export default ForBusinessLogin;
