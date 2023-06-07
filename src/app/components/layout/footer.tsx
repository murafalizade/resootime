import React from 'react';
import styles from '@/app/styles/Footer.module.scss';
import Image from 'next/dist/client/image';
import { BsInstagram, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <div className="row px-5 pb-4">
                    <div className="col-12 text-center text-md-start">
                        <a href="/" className="navbar-brand fs-2">
                            <Image
                                src={'/images/footer_logo.png'}
                                alt="logo"
                                width={45}
                                height={45}
                                className="img-fluid m-3 ms-0 icon nav-img"
                            />
                            ResooTime
                        </a>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 d-md-none pb-5">
                            <div className="text-center">
                                <a
                                    className={`navbar-brand ${styles.link_heading}`}>
                                    Resootime ilə restoranları kəşf et, <br />
                                    təcrübəni hiss et, zövqü dəyərləndir.
                                </a>
                                <ul className={styles.list}>
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
                    </div>
                    <div className="row px-5 pb-4">
                        <div className="col-6 col-md-4">
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
                                        <a href="/discovery" className="link">
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
                        <div className="col-6 col-md-4 d-flex justify-content-center">
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
                        <div className="col-md-4 d-none d-md-flex col-12 justify-content-end">
                            <div className="text-end">
                                <a
                                    className={`navbar-brand ${styles.link_heading}`}>
                                    Bizi sosial şəbəkələrdən izləyin
                                </a>
                                <ul className={styles.list}>
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
                    </div>
                    <hr />
                    <p className={`text-center pt-3 ${styles.rights}`}>
                        © 2023 Bütün hüquqları qorunur
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
