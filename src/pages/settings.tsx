import RestaurantService from '@/app/api/services/restaurantService';
import CompleteInfoForum from '@/app/components/forms/completeInfoForum';
import InlineMenu from '@/app/components/reservation/inlineMenu';
import Cookie from '@/app/utils/Cookie';
import Head from 'next/head';
import React from 'react';

const Settings = ({ res }: any) => {
    return (
        <>
            <Head>
                <title>Tənzimləmələr | ResooTime</title>
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
            <div className="d-flex">
                <InlineMenu />
                <div className="container">
                    <CompleteInfoForum isUpdate={true} res={res} />
                </div>
            </div>
        </>
    );
};

export default Settings;

export async function getServerSideProps(context: any) {
    const { req } = context;
    const token = Cookie.getFromSSR(req, 'token');
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    const res = await RestaurantService.getRestaurantByToken(token!);
    //  let wildcard = req.headers.host.split('.')[0];

    // if (wildcard === 'www') {
    //     return {
    //         redirect: {
    //             destination: `http://${res.name}.${process.env.BASE_URL}.com/settings`,
    //             permanent: false,
    //         },
    //     };
    // }
    return {
        props: {
            res,
        },
    };
}
