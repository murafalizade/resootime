import UserService from '@/app/api/services/userService';
import Layout from '@/app/components/layout/layout';
import MyReservation from '@/app/components/reservation/myReservation';
import withAuth from '@/app/hoc/withAuth';
import Cookie from '@/app/utils/Cookie';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const Myreservation = () => {
    const [reserv, setReserv] = useState<any[]>([]);
    const [user, setUser] = useState<any>();
    useEffect(() => {
        const getUser = async (token: string) => {
            const user = await UserService.getUserByToken(token);
            const reserv = await UserService.myReservations(user.id, token);
            setUser(user);
            setReserv(reserv);
        };
        const token = Cookie.get('token');
        getUser(token!);
    }, []);

    return (
        <>
            <Head>
                <title>Rezervasiyalarım | ResooTime.com</title>
                <meta
                    name="description"
                    content={`Rezervasiyalara bax, ləğv et, düzəliş et. Indi istənilən vaxta masanı seçib rezerv et. `}
                />
                <meta
                    name="keywords"
                    content={`${user?.first_name}, restoran, rezerv et, restoran, rezervasiya et, masani sec, rezervasiya, masa`}
                />
                <meta
                    name="og:title"
                    content={`Rezervasiyalarım | ResooTime.com`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <meta
                    property="og:description"
                    content={`Rezervasiyalara bax, ləğv et, düzəliş et. Indi istənilən vaxta masanı seçib rezerv et. `}
                />
                <meta property="og:site_name" content="ResooTime" />
            </Head>
            <Layout>
                <main style={{ backgroundColor: '#f2f3f4', height: '100vh' }}>
                    <h4 className="p-3 mx-5">
                        <b>Rezervasiyalarım</b>
                    </h4>
                    <MyReservation reserv={reserv} />
                </main>
            </Layout>
        </>
    );
};

export default withAuth(Myreservation, true);
