import React from 'react';
import styles from '@/app/styles/Form.module.scss';
import RegisterForum from '@/app/components/forms/registerForum';
import Image from 'next/dist/client/image';
import Head from 'next/head';

const Register = () => {
    return (
        <>
            <Head>
                <title>Qeydiyyatdan keçin - Resootime.com</title>
                <meta
                    name="description"
                    content="Resootime.com saytına qeydiyyatdan keçin və öz hesabınızı yaradın."
                />
                <meta name="keywords" content="qeydiyyat, hesab yaratmaq" />
                <meta
                    property="og:title"
                    content="Qeydiyyatdan keçin - Resootime.com"
                />
                <meta
                    property="og:description"
                    content="Resootime.com saytına qeydiyyatdan keçin və öz hesabınızı yaradın."
                />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <link rel="canonical" href="https://resootime.com/register" />
            </Head>
            <nav>
                <div className="container-fluid border-bottom">
                    <div className="navbar p-3">
                        <div>
                            <a href="/" className="navbar-brand">
                                <Image
                                    src={'/images/logo.png'}
                                    alt="resootime logo"
                                    width={45}
                                    height={45}
                                    className="img-fluid mx-3 logo nav-img"
                                />
                                ResooTime
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div
                className={`${styles.form_bg} d-flex justify-content-center align-items-center`}>
                <RegisterForum />
            </div>
        </>
    );
};

export default Register;
