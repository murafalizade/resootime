import RestaurantService from '@/app/api/services/restaurantService';
import { Loading } from '@/app/components/layout/loading';
import InlineMenu from '@/app/components/reservation/inlineMenu';
import withClient from '@/app/hoc/withClient';
import { setTables } from '@/app/redux/commonSlice';
import Cookie from '@/app/utils/Cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
// import CreateMapTool from "@/app/components/restaurant/createMapTool";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CreateMapTool = dynamic(
    () => import('@/app/components/restaurant/createMapTool'),
    {
        ssr: false,
        loading: () => <Loading />,
    },
);

const CreateMap = ({ restId, tbls, wall }: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTables(tbls));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>Masa dizaynınızı tamamlayın | ResooTime</title>
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
                <CreateMapTool restId={restId} wall={wall} />
            </div>
        </>
    );
};

export default withClient(CreateMap);

export async function getServerSideProps(context: any) {
    const { req } = context;
    const token = Cookie.getFromSSR(req, 'token');
    const rest = await RestaurantService.getRestaurantByToken(token);
    let wildcard = req.headers.host.split('.')[0];

    // if (wildcard === 'wwww') {
    //     return {
    //         redirect: {
    //             destination: `http://${rest.name}.${process.env.BASE_URL}.com/create-map`,
    //             permanent: false,
    //         },
    //     };
    // }

    const map = await RestaurantService.getTables(rest.id);
    return {
        props: {
            restId: rest.id,
            tbls: map?.table || [],
            wall: map?.wall || '',
        },
    };
}
