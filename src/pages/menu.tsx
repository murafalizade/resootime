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

const Menu = ({ res }: any) => {
    return (
        <div className='d-md-none '>
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
            <div className={`${menuStyles.menu_container}`}>
                <div className="ps-3 pe-4 d-flex align-items-center justify-content-between">
                    <a href={`/restaurants/r/ResooTime`} className="text-dark ">
                        <IoIosArrowBack size={'2rem'} />
                    </a>
                    <h2
                        className={`text-center pt-4 pb-2 ${menuStyles.res_name}`}>
                        {/* {res.name} */}
                        Menu
                    </h2>
                    <FiSearch size={'2rem'} />
                </div>
                <ResMenu />
            </div>
            <Footer />
        </div>
    );
};

export default Menu;
