import RestaurantService from '@/app/api/services/restaurantService';
import AdminModal from '@/app/components/reservation/adminModal';
import InlineMenu from '@/app/components/reservation/inlineMenu';
import MyCustomers from '@/app/components/reservation/myCustomers';
import ReservationNav from '@/app/components/reservation/reservationNav';
import { formatDate } from '@/app/constants/date';
import withClient from '@/app/hoc/withClient';
import { selectIsModelOpen } from '@/app/redux/commonSlice';
import Cookie from '@/app/utils/Cookie';
import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';

const Customers = ({ reserv, rest }: any) => {
    const isModalOpen = useSelector(selectIsModelOpen);
    return (
        <>
            <Head>
                <title>Müştərilərim | ResooTime</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    name="description"
                    content="ResooTime - bütün restoranlar burada. Sevimli restoranlarınızı onlayn rezerv edin və bonus qazanın."
                />
                <meta name="og:title" content="ResooTime" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <meta
                    property="og:description"
                    content="ResooTime - bütün restoranlar burada. Sevimli restoranlarınızı onlayn rezerv edin və bonus qazanın."
                />
                <meta property="og:site_name" content="ResooTime" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isModalOpen ? <div className="overlay"></div> : null}
            <main style={{ backgroundColor: '#212841', height: '100vh' }}>
                <ReservationNav name={rest.name} />
                <AdminModal />
                <div className="d-flex">
                    <InlineMenu />
                    <MyCustomers restId={rest.id} reserv={reserv} />
                </div>
            </main>
        </>
    );
};

export default withClient(Customers);

// SSR
export async function getServerSideProps(context: any) {
    const { req, query } = context;
    let { date } = query;
    if (!date) {
        date = new Date().toLocaleDateString(formatDate.locale);
    }
    const token = Cookie.getFromSSR(req, 'token');
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    const rest = await RestaurantService.getRestaurantByToken(token!);
    // let wildcard = req.headers.host.split('.')[0];

    // if (wildcard === 'www') {
    //     return {
    //         redirect: {
    //             destination: `http://${rest.name}.${process.env.BASE_URL}.com/customers`,
    //             permanent: false,
    //         },
    //     };
    // }

    const reserv = await RestaurantService.getReservationByDate(rest.id, date);
    return {
        props: {
            rest,
            reserv,
        },
    };
}
