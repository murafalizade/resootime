import UserProfilForum from '@/app/components/forms/userProfilForum';
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/app/components/layout/layout';
import UserService from '@/app/api/services/userService';
import Cookie from '@/app/utils/Cookie';
import styles from '@/app/styles/Form.module.scss';
import UserChangePasswordForum from '@/app/components/forms/userChangePasswordForum';

const UserSettings = ({ user }: any) => {
    const [isProfil, setIsProfil] = useState(true);

    return (
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
    );
};

export default UserSettings;

export async function getServerSideProps(context: any) {
    const { req } = context;
    const token = Cookie.getFromSSR(req, 'token');
    const user = await UserService.getUserByToken(token);
    return {
        props: {
            user,
        },
    };
}
