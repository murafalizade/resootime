import Cookie from '@/app/utils/Cookie';
import Image from 'next/dist/client/image';
import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/Navbar.module.scss';
import Router from 'next/dist/client/router';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { TiDeleteOutline } from 'react-icons/ti';
import { FiSearch } from 'react-icons/fi';

interface IProps {
    isRestuarantPage?: boolean;
}

const Navbar = (props: IProps) => {
    const [isLogin, setIsLogin] = useState(false);
    const [completeInfo, setCompleteInfo] = useState('');
    const [show, setShow] = useState(true);

    useEffect(() => {
        const token = Cookie.get('token');
        setCompleteInfo(Cookie.get('CompleteInfo')!);
        if (token) {
            setIsLogin(true);
        }
    }, []);

    const logout = () => {
        Cookie.delete('token');
        Cookie.delete('CompleteInfo');
        Router.reload();
    };

    const close = () => {
        setCompleteInfo('');
        Cookie.delete('CompleteInfo');
    };

    const [isMobile, setIsMobile] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    return (
        <nav>
            {completeInfo ? (
                <div className="container-fluid justify-content-between d-flex bg-warning text-center border-bottom">
                    <p className="text-light pt-3 text-center ">
                        Mail addressinizə hesabınızı tamamlamaq üçün link
                        göndəriləcəkdir.
                    </p>
                    <span onClick={() => close()} className="pt-3 text-center">
                        <TiDeleteOutline size={'1.5rem'} color="white" />
                    </span>
                </div>
            ) : null}
            <div className="container-fluid border-bottom">
                <div className="navbar">
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
                        <a
                            href="/discovery"
                            className="btn-link fs-6 mx-5 text-dark dark text-decoration-none link d-none d-md-inline">
                            Restoranlar üçün
                        </a>
                    </div>
                    {!isLogin ? (
                        <>
                            <div className={styles.nav_btns}>
                                <a
                                    href={
                                        props.isRestuarantPage
                                            ? '/forbusiness-login'
                                            : '/register'
                                    }
                                    className="btn btn-outline-primary mx-2">
                                    Qeydiyyat
                                </a>
                                <a
                                    href="/login"
                                    className="btn btn-primary mx-2">
                                    Giriş
                                </a>
                            </div>
                            <div
                                className={`${
                                    isMobile
                                        ? styles.nav_links_mobile
                                        : styles.d_none
                                } ${
                                    isClicked
                                        ? styles.active
                                        : styles.nav_links_mobile
                                }`}>
                                <a
                                    href="/discovery"
                                    className="btn-link fs-6 mb-3 text-dark dark text-decoration-none link"
                                    onClick={() => setIsMobile(false)}>
                                    Restoranlar üçün
                                </a>
                                <a
                                    href={
                                        props.isRestuarantPage
                                            ? '/forbusiness-login'
                                            : '/register'
                                    }
                                    className="btn btn-primary my-3"
                                    onClick={() => setIsMobile(false)}>
                                    Qeydiyyat
                                </a>
                                <a
                                    href="/login"
                                    className="btn btn-outline-primary my-3"
                                    onClick={() => setIsMobile(false)}>
                                    Giriş
                                </a>
                            </div>
                            <div className={`d-sm-none ${styles.sidebar}`}>
                                <FiSearch size={'1.7em'} className="me-3" />
                                {isClicked ? (
                                    <IoClose
                                        size={'2em'}
                                        color="#374167"
                                        onClick={() => {
                                            setIsMobile(!isMobile),
                                                setIsClicked(!isClicked);
                                        }}
                                    />
                                ) : (
                                    <GiHamburgerMenu
                                        size={'2em'}
                                        color="#374167"
                                        onClick={() => {
                                            setIsMobile(!isMobile),
                                                setIsClicked(!isClicked);
                                        }}
                                        className="text-dark"
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.dropdown}>
                            <Image
                                src={'/images/avatar_image.png'}
                                alt="user"
                                width={50}
                                height={50}
                                className="nav-img"
                            />
                            <div className={styles.dropdown_content}>
                                <a
                                    href="/my-reservation"
                                    className={styles.dropdown_link}>
                                    Rezervasiyalarım
                                </a>
                                <a
                                    href="/user-settings"
                                    className={styles.dropdown_link}>
                                    Parametrlər
                                </a>
                                <a
                                    role="button"
                                    className={styles.dropdown_link}
                                    onClick={logout}>
                                    Çıxış
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
