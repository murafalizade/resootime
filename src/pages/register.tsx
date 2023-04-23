import React from 'react';
import styles from '@/app/styles/Form.module.scss';
import RegisterForum from '@/app/components/forms/registerForum';
import Image from 'next/dist/client/image';

const Register = () => {
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
