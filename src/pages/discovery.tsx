import Layout from '@/app/components/layout/layout';
import React from 'react';
import styles from '@/app/styles/Discovery.module.scss';
import Image from 'next/image';
import { ImPhone } from 'react-icons/im';
import Head from 'next/head';

const Discovery = () => {
    return (
        <Layout isRestuarantPage={true}>
            <Head>
                <title>
                    Restoranlar üçün ən yaxşı rezervasiya sistemi və
                    üstünlükləri ilə tanış olun - Resootime.com
                </title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="Restoran rezervasiyası
                    və müştəri məmnuniyyəti
                    bir arada"
                />
                <meta
                    name="keywords"
                    content="rezervasiya, Effektiv istifadə, Müştəri bazası, Daimi Müştərilər, Masaların Xəritəsi
, Xatırladıcı, Effektiv istifadə, ödenissiz yoxla, Dolu Masalar, bizim iş modeli, xüsusiyyətlər, viziya, restoran, sahib, Azərbaycan"
                />
            </Head>
            <main>
                <section
                    className={`sect_banner ${styles.sect} ${styles.sect_banner}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
                                <h2
                                    className={`fw-bold word-break ms-2 ${styles.heading}`}>
                                    Restoran rezervasiyası <br /> və müştəri
                                    məmnuniyyəti
                                    <br /> bir arada
                                </h2>
                                <div className="d-flex mt-4">
                                    <a
                                        href="/forbusiness-login"
                                        className="btn btn-primary mx-2">
                                        Ödənişsiz Yoxlayın
                                    </a>
                                    <a
                                        href="https://wa.me/+994508507009"
                                        className="btn btn-outline-primary mx-2">
                                        Bizimlə Əlaqə
                                    </a>
                                </div>
                            </div>
                            <div
                                className={`col-12 col-lg-6 mt-4 mt-md-0 ${styles.discovery_img_div}`}>
                                <Image
                                    alt="resootime tablet"
                                    src={'/images/discovery_img.png'}
                                    width={530}
                                    height={300}
                                    quality={100}
                                    className={`discovery-img ${styles.discovery_img}`}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={`bg-light py-md-5 ${styles.sect}`}>
                    <div className="container mt-4">
                        <h2 className="text-center">
                            Rezervasiya İdarəetmə Sistemi
                        </h2>
                        <div className="row mt-5">
                            <div className="col-12 col-md-4">
                                <h3>
                                    <span>
                                        <Image
                                            className="me-2"
                                            alt="Rezervasiya İdarəetmə Sistemi"
                                            src="/icons/time.svg"
                                            width={30}
                                            height={30}
                                        />
                                    </span>
                                    Effektiv istifadə
                                </h3>
                                <p>
                                    Zəng ilə rezervasiya qəbul etmək artıq
                                    geridə qaldı. İndi, rezervasiyaları 24/7{' '}
                                    <i>
                                        <b>onlayn</b>
                                    </i>{' '}
                                    qəbul edərək, işinizi asanlaşdırmağın və
                                    vaxtınıza qənaət etməyin zamanıdır.
                                </p>
                            </div>
                            <div className="col-12 col-md-4">
                                <h3>
                                    <span>
                                        <Image
                                            className="me-2"
                                            alt="Effektiv istifadə"
                                            src="/icons/database.svg"
                                            width={30}
                                            height={30}
                                        />
                                    </span>
                                    Müştəri bazası
                                </h3>
                                <p>
                                    Rezervasiya edən bütün müştərilərinizin
                                    məlumatlarını və restoranınız haqda
                                    rəylərini təhlil edərək onlara daha yaxşı
                                    xidmət təklif edə bilərsiniz
                                </p>
                            </div>
                            <div className="col-12 col-md-4">
                                <h3>
                                    <span>
                                        <Image
                                            className="me-2"
                                            alt="Müştəri bazası"
                                            src="/icons/convert.svg"
                                            width={30}
                                            height={30}
                                        />
                                    </span>
                                    Daimi Müştərilər
                                </h3>
                                <p>
                                    Rezervasiya edən müştərilərə endirimlər
                                    təklif edərək, daimi müştərilər qazanın
                                </p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p
                                className={`text-primary p-2 w-75 rounded-pill border-primary mt-5 border ${styles.text_border_primary}`}>
                                Əyləşəcəyi masanı özü seçən müştərilərin
                                restorandan daha məmnun qaldığını bilirdiniz?
                            </p>
                        </div>
                    </div>
                </section>

                <section className={`py-md-5 ${styles.sect}`}>
                    <div className="container py-md-4">
                        <h2 className="text-center">
                            Keyfiyyətli xidmət = Məmnun müştəri
                        </h2>
                        <div className="row mt-5">
                            <div className="col-12 col-md-4">
                                <h3>
                                    <span>
                                        <Image
                                            className="me-2"
                                            alt="Effektiv istifadə"
                                            src="/icons/map.svg"
                                            width={25}
                                            height={25}
                                        />
                                    </span>
                                    Masaların Xəritəsi
                                </h3>
                                <p>
                                    Müştərilər restoranın sadələşdirilmiş
                                    xəritəsi üzərindən əyləşmək istədiklərini{' '}
                                    <b>“masa”</b>-nı rezerv edə biləcəklər{' '}
                                </p>
                            </div>
                            <div className="col-12 col-md-4">
                                <h3>
                                    <span>
                                        <Image
                                            className="me-2"
                                            alt="Masaların Xəritəsi"
                                            src="/icons/notif.svg"
                                            width={25}
                                            height={25}
                                        />
                                    </span>
                                    Xatırladıcı
                                </h3>
                                <p>
                                    Xatırladıcı bildirişlər sayəsində
                                    müştərilərinizin etdiyi rezervasiyaları
                                    unutmağının və gecikmələrin qarşısını
                                    alaraq, yaranan qarışıqlığı aradan qaldıra
                                    biləcəksiniz
                                </p>
                            </div>
                            <div className="col-12 col-md-4">
                                <h3>
                                    <span>
                                        <Image
                                            className="me-2"
                                            alt="Xatırladıcı"
                                            src="/icons/table.svg"
                                            width={25}
                                            height={25}
                                        />
                                    </span>
                                    Dolu Masalar
                                </h3>
                                <p>
                                    Bir kliklə rezervasiyanı ləğv etməyin
                                    mümkünlüyü, rezervasiya edib, lakin{' '}
                                    <del>restorana gəlməyən</del> müştərilərin
                                    sayını azaldacaq və masalarınız hər zaman
                                    dolu olacaqdır
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className={`bg-light pt-0 py-md-5 ${styles.sect_contact} ${styles.sect}`}>
                    <div className="container">
                        <div
                            className={`row my-4 p-4 mt-5 ${styles.number_field}`}>
                            <div className="p-0 m-0 col-12 col-md-6 d-flex flex-column align-items-md-start align-items-center">
                                <h5 className="m-0 text-md-start text-center">
                                    Ətraflı məlumat öyrənmək istəyirsiniz?
                                </h5>
                                <p className="m-0 p-0 text-muted">
                                    Zəhmət olmasa, bizimlə əlaqə saxlayın
                                </p>
                            </div>
                            <div className="p-0 m-0 mt-2 mt-md-0 col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
                                <a
                                    href="tel:+994508507009"
                                    className={`btn btn-primary fs-5 px-4 py-2 bg-light d-flex align-items-center  ${styles.text_border_primary}`}>
                                    <ImPhone
                                        color="#6A5DDF"
                                        className="fs-3 mt-1 me-2"
                                    />
                                    +994 50 850 70 09
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default Discovery;
