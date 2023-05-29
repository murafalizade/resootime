import React, { useEffect, useState } from 'react';
import navStyles from '@/app/styles/Navbar.module.scss';
import galleryStyles from '@/app/styles/Gallery.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import Image from 'next/dist/client/image';
import { GetServerSideProps } from 'next';
import RestaurantService from '@/app/api/services/restaurantService';
import Footer from '@/app/components/layout/footer';

const Gallery = ({ res }: any) => {
    console.log(res);
    return (
        <>
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
                            href={`/restaurants/r/ResooTime`}
                            className="text-dark ">
                            <IoIosArrowBack size={'2rem'} />
                        </a>
                        <h2
                            className={`text-center pt-4 pb-2 ${galleryStyles.heading}`}>
                            Şəkillər
                        </h2>
                        <a></a>
                    </div>
                    <div className={`${galleryStyles.gallery_container}`}>
                        <div className="row mb-1">
                            <div className="col-12">
                                <Image
                                    src={'/images/res1.webp'}
                                    alt="logo"
                                    width={45}
                                    height={144}
                                    quality={100}
                                    className={`${galleryStyles.gallery_img}`}
                                />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-8 pe-1">
                                <Image
                                    src={'/images/res1.webp'}
                                    alt="logo"
                                    width={45}
                                    height={144}
                                    className={`${galleryStyles.gallery_img}`}
                                />
                            </div>
                            <div className="col-4 ps-1">
                                <Image
                                    src={'/images/res1.webp'}
                                    alt="logo"
                                    width={45}
                                    height={144}
                                    className={`${galleryStyles.gallery_img}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Gallery;

// export const getServerSideProps: GetServerSideProps = async ({
//     params,
//     req,
// }) => {
//     const id = params?.id;
//     let wildcard = req.headers.host?.split('.')[0];
//     if (wildcard !== 'localhost:3000') {
//         return {
//             redirect: {
//                 destination: `http://localhost:3000/restaurants/r/${id}-gallery`,
//                 permanent: false,
//             },
//         };
//     }
//     const res = await RestaurantService.getRestaurant(id! as string);
//     return { props: { res } };
// };
