import RestaurantService from '@/app/api/services/restaurantService';
import CompleteInfoForum from '@/app/components/forms/completeInfoForum';
import InlineMenu from '@/app/components/reservation/inlineMenu';
import Cookie from '@/app/utils/Cookie';
import React from 'react';

const Settings = ({ res }: any) => {
    return (
        <div className="d-flex">
            <InlineMenu />
            <div className="container">
                <CompleteInfoForum isUpdate={true} res={res} />
            </div>
        </div>
    );
};

export default Settings;

export async function getServerSideProps(context: any) {
    const { req } = context;
    const token = Cookie.getFromSSR(req, 'token');
    const res = await RestaurantService.getRestaurantByToken(token);
    let wildcard = req.headers.host.split('.')[0];

    if (wildcard === 'localhost:3000') {
        return {
          redirect: {
            destination: `http://${res.name}.localhost:3000/settings`,
            permanent: false,
          },
        };
      }
    return {
        props: {
            res,
        },
    };
}
