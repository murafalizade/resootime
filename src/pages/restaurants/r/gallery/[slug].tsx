import React, { useEffect, useState } from 'react';
import navStyles from '@/app/styles/Navbar.module.scss';
import galleryStyles from '@/app/styles/Gallery.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import Image from 'next/dist/client/image';
import { GetServerSideProps } from 'next';
import RestaurantService from '@/app/api/services/restaurantService';
import Footer from '@/app/components/layout/footer';
import BASE_URL from '@/app/constants/baseUrl';
import Head from 'next/head';

const Gallery = ({ res }: any) => {
    const gallery = res?.images;
    const arrayLength = Math.round(gallery.length / 3);
    console.log(arrayLength);
    return (
        <>
            <Head>
                <title>Şəkillər - {res.name} | ResooTime.com</title>
                <meta
                    name="description"
                    content={`Bütün şəkillərə bax. Indi istənilən vaxta masanı seçib rezerv et. ${res.name} - ${res.description}`}
                />
                <meta
                    name="keywords"
                    content={`${res.name},şəkil, rəsm, galeriya, foto, restoran, rezerv et, restoran ${res.location}, rezervasiya et, masani sec, rezervasiya, masa,  ${res.category?.name}`}
                />
                <meta
                    name="og:title"
                    content={`Şəkillər - ${res.name} | ResooTime.com`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <meta
                    property="og:description"
                    content={`Bütün şəkillərə bax. Indi istənilən vaxta masanı seçib rezerv et. ${res.name} - ${res.description}`}
                />
                <meta property="og:site_name" content="ResooTime" />
            </Head>
            <div className={`${galleryStyles.gallery}`}>
                <div className="navbar py-4">
                    <div>
                        <a
                            href="/"
                            className={`navbar-brand ${navStyles.brand_name}`}>
                            <Image
                                src={'/images/logo.png'}
                                alt="logo"
                                width={45}
                                height={45}
                                className="img-fluid mx-3 logo icon nav-img"
                            />
                            ResooTime
                        </a>
                    </div>
                </div>
                <div className={``}>
                    <div className="ps-3 pe-4 d-flex align-items-center justify-content-between">
                        <a
                            onClick={() => {
                                history.back();
                            }}
                            className="text-dark ">
                            <IoIosArrowBack size={'2rem'} />
                        </a>
                        <h2
                            className={`text-center pt-4 pb-2 ${galleryStyles.heading}`}>
                            Şəkillər
                        </h2>
                        <a className="p-3"></a>
                    </div>
                    <div className={`${galleryStyles.gallery_container}`}>
                        {Array(arrayLength)
                            .fill('')
                            .map((item: any, index: number) => (
                                <>
                                    <div
                                        className={`row ${galleryStyles.img_mb}`}>
                                        <div className="col-12">
                                            <Image
                                                src={
                                                    gallery[3 * index]?.image
                                                        ? BASE_URL +
                                                          gallery[3 * index]
                                                              ?.image
                                                        : '/images/rest_imag.png'
                                                }
                                                alt="logo"
                                                width={45}
                                                height={144}
                                                quality={100}
                                                className={`${galleryStyles.gallery_img}`}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`row ${galleryStyles.img_mb}`}>
                                        <div className={`col-8 pe-0`}>
                                            <Image
                                                src={
                                                    gallery[3 * index + 1]
                                                        ?.image
                                                        ? BASE_URL +
                                                          gallery[3 * index + 1]
                                                              ?.image
                                                        : '/images/rest_imag.png'
                                                }
                                                alt="logo"
                                                width={45}
                                                height={144}
                                                className={`${galleryStyles.gallery_img}`}
                                            />
                                        </div>
                                        <div
                                            className={`col-4 ${galleryStyles.img_pe}`}>
                                            <Image
                                                src={
                                                    gallery[3 * index + 2]
                                                        ?.image
                                                        ? BASE_URL +
                                                          gallery[3 * index + 2]
                                                              ?.image
                                                        : '/images/rest_imag.png'
                                                }
                                                alt="logo"
                                                width={45}
                                                height={144}
                                                className={`${galleryStyles.gallery_img}`}
                                            />
                                        </div>
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Gallery;

export const getServerSideProps: GetServerSideProps = async ({
    params,
    req,
}) => {
    let id = params?.slug?.toString();
    const res = await RestaurantService.getRestaurant(id as string);
    return { props: { res } };
};
