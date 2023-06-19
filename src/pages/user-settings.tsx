import UserProfilForum from '@/app/components/forms/userProfilForum';
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/app/components/layout/layout';
import UserService from '@/app/api/services/userService';
import Cookie from '@/app/utils/Cookie';
import styles from '@/app/styles/Form.module.scss';
import UserChangePasswordForum from '@/app/components/forms/userChangePasswordForum';
import withAuth from '@/app/hoc/withAuth';
import Head from 'next/head';

const UserSettings = ({ user }: any) => {
    const [isProfil, setIsProfil] = useState(true);

    return (
        <>
            <Head>
                <title>{user.first_name} | ResooTime.com</title>
                <meta
                    name="description"
                    content={`Indi istənilən vaxta masanı seçib rezerv et.`}
                />
                <meta
                    name="keywords"
                    content={`restoran, rezerv et, restoran, rezervasiya et, masani sec, rezervasiya, masa}`}
                />
                <meta name="og:title" content={`ResooTime.com`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <meta
                    property="og:description"
                    content={`Indi istənilən vaxta masanı seçib rezerv et.`}
                />
                <meta property="og:site_name" content="ResooTime" />
            </Head>
            <Layout>
                <div className={`p-5 ${styles.form_bg}`}>
                    <div className="row">
                        {isProfil ? (
                            <h5 className="text-center">Profil</h5>
                        ) : (
                            <h5 className="text-center">Parolu Dəyişin</h5>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-12 ps-md-5 mt-5">
                            <div>
                                <h5>
                                    <Link
                                        href=""
                                        className={`text-decoration-none side-link ${
                                            isProfil && 'visited-side-link'
                                        }`}
                                        onClick={() => {
                                            setIsProfil(true);
                                        }}>
                                        Hesab Məlumatları
                                    </Link>
                                </h5>
                            </div>
                            <div>
                                <h5>
                                    <Link
                                        href=""
                                        className={`text-decoration-none side-link ${
                                            !isProfil && 'visited-side-link'
                                        }`}
                                        onClick={() => {
                                            setIsProfil(false);
                                        }}>
                                        Parol
                                    </Link>
                                </h5>
                            </div>
                        </div>
                        <div className="col-md-8 col-12 mt-4">
                            {isProfil ? (
                                <UserProfilForum user={user} />
                            ) : (
                                <UserChangePasswordForum user={user} />
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

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
    const user = await UserService.getUserByToken(token!);
    return {
        props: {
            user,
        },
    };
}

export default withAuth(UserSettings, true);
