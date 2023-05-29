import React from 'react';
import ResMenu from '@/app/components/reservation/resMenu';
import { GetServerSideProps } from 'next';
import RestaurantService from '@/app/api/services/restaurantService';
import menuStyles from '@/app/styles/Menu.module.scss';
import navStyles from '@/app/styles/Navbar.module.scss';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import Image from 'next/dist/client/image';
import Footer from '@/app/components/layout/footer';
import withAuth from '@/app/hoc/withAuth';
import Head from 'next/head';

const Menu = ({ res }: any) => {
    return (
        <>
            <Head>
                <title>Menyu - {res.name} | ResooTime.com</title>
                <meta
                    name="description"
                    content={`${res.name}nın menyusu, yeməklərin qiymətinə, şəklinə və tərkibinə bax. Indi istənilən vaxta masanı seçib rezerv et. ${res.name} - ${res.description}`}
                />
                <meta
                    name="keywords"
                    content={`${res.name},menyu, kulinariyya, yemək, ləzzət, ləzzətli, restoran, rezerv et, restoran ${res.location}, rezervasiya et, masani sec, rezervasiya, masa,  ${res.category?.name}`}
                />
                <meta
                    name="og:title"
                    content={`Menyu - ${res.name} | ResooTime.com`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <meta
                    property="og:description"
                    content={`${res.name}nın menyusu, yeməklərin qiymətinə, şəklinə və tərkibinə bax. Indi istənilən vaxta masanı seçib rezerv et. ${res.name} - ${res.description}`}
                />
                <meta property="og:site_name" content="ResooTime" />
            </Head>
            <div className="d-md-none">
                <div className={`navbar py-4 ${menuStyles.navbar}`}>
                    <div>
                        <a
                            href="#"
                            onClick={() => {
                                history.back();
                            }}
                            title="Geri"
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
                <div className={`${menuStyles.menu_container}`}>
                    <div className="ps-3 pe-4 d-flex align-items-center justify-content-between">
                        <a
                            onClick={() => {
                                history.back();
                            }}
                            className="text-dark ">
                            <IoIosArrowBack size={'2rem'} />
                        </a>
                        <h2
                            className={`text-center pt-4 pb-2 ${menuStyles.res_name}`}>
                            {res.name}
                        </h2>
                        <FiSearch size={'2rem'} />
                    </div>
                    <ResMenu id={res.id} />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default withAuth(Menu, false);

export const getServerSideProps: GetServerSideProps = async ({
    params,
    req,
}) => {
    let id = params?.slug?.toString();
    const res = await RestaurantService.getRestaurant(id as string);
    return { props: { res } };
};
