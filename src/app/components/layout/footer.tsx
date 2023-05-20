import React from 'react';
import styles from '@/app/styles/Footer.module.scss';
import Image from 'next/dist/client/image';
import {
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsWhatsapp,
} from 'react-icons/bs';

const Footer = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <div className="container">
                    <div className="row mb-5 d-none d-md-flex">
                        <div className="col-md-4">
                            <a href="/" className="navbar-brand">
                                <Image
                                    src={'/images/logo.png'}
                                    alt="logo"
                                    width={45}
                                    height={45}
                                    className="img-fluid m-3 ms-0 icon nav-img"
                                />
                                ResooTime
                            </a>
                            <p>Restoran rezervasiya sistemi</p>
                        </div>
                        <div className="col-md-4 mt-md-4 mt-2">
                            <a className="navbar-brand text-muted">
                                Restoranlar üçün
                            </a>
                            <ul className={styles.list}>
                                <li>
                                    <a href="/discovery" className="link">
                                        Biznes
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 mt-md-4 mt-2">
                            <a className="navbar-brand text-muted">
                                Bizimlə əlaqə
                            </a>
                            <ul className={styles.list}>
                                <li>
                                    <a
                                        href="tel:+994508507009"
                                        className="link">
                                        +994 50 850 70 09
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:info@resootime.com"
                                        className="link">
                                        resootime@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="me-3 link"
                                        href="https://instagram.com/resootime?igshid=YmMyMTA2M2Y="
                                        target="_blank"
                                        rel="noreferrer">
                                        <BsInstagram size={'1.5em'} />
                                    </a>
                                    <a
                                        className="mx-3 link"
                                        href="https://www.linkedin.com/company/resootime/"
                                        target="_blank"
                                        rel="noreferrer">
                                        <BsLinkedin size={'1.5em'} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mb-5 d-md-none">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <a
                                href="/"
                                className={`navbar-brand main-border-bottom ${styles.footer_brand}`}>
                                <Image
                                    src={'/images/logo.png'}
                                    alt="logo"
                                    width={45}
                                    height={45}
                                    className="img-fluid m-3 ms-0 icon nav-img"
                                />
                                ResooTime
                            </a>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-center flex-column mt-5">
                            <p className="text-center">
                                Resootime ilə restoranları kəşf et, <br />
                                təcrübəni hiss et, zövqü dəyərləndir.
                            </p>
                            <ul className={styles.list}>
                                <li>
                                    <a
                                        className="mx-3 link"
                                        href="https://www.linkedin.com/company/resootime/"
                                        target="_blank"
                                        rel="noreferrer">
                                        <BsLinkedin size={'1.5em'} />
                                    </a>
                                    <a
                                        className="mx-3 link"
                                        href="https://instagram.com/resootime?igshid=YmMyMTA2M2Y="
                                        target="_blank"
                                        rel="noreferrer">
                                        <BsInstagram size={'1.5em'} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 mt-5 mb-4 pt-5">
                            <div className="row">
                                <div className="col-6 d-flex flex-column align-items-center">
                                    <div>
                                        <a
                                            className={`navbar-brand ${styles.link_heading}`}>
                                            Restoranlar üçün
                                        </a>
                                        <ul className={styles.list}>
                                            <li>
                                                <a href="/" className="link">
                                                    Ana Səhifə
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/discovery"
                                                    className="link">
                                                    Biznes
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="link">
                                                    Tez tez verilən suallar
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-6 d-flex flex-column align-items-center">
                                    <div>
                                        <a
                                            className={`navbar-brand ${styles.link_heading}`}>
                                            Bizimlə əlaqə
                                        </a>
                                        <ul className={styles.list}>
                                            <li>
                                                <a
                                                    href="tel:+994508507009"
                                                    className="link">
                                                    +994 50 850 70 09
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="mailto:info@resootime.com"
                                                    className="link">
                                                    resootime@gmail.com
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p className="text-center pt-3">
                        © 2023 Bütün hüquqları qorunur
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
