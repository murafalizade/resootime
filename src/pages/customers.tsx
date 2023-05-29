import RestaurantService from '@/app/api/services/restaurantService';
import AdminModal from '@/app/components/reservation/adminModal';
import InlineMenu from '@/app/components/reservation/inlineMenu';
import MyCustomers from '@/app/components/reservation/myCustomers';
import ReservationNav from '@/app/components/reservation/reservationNav';
import { formatDate } from '@/app/constants/date';
import withClient from '@/app/hoc/withClient';
import { selectIsModelOpen } from '@/app/redux/commonSlice';
import Cookie from '@/app/utils/Cookie';
import React from 'react';
import { useSelector } from 'react-redux';

const Customers = ({ reserv, restName }: any) => {
    const isModalOpen = useSelector(selectIsModelOpen);
    return (
        <>
            {isModalOpen ? <div className="overlay"></div> : null}
            <main style={{ backgroundColor: '#212841', height: '100vh' }}>
                <ReservationNav name={restName} />
                <AdminModal />
                <div className="d-flex">
                    <InlineMenu />
                    <MyCustomers reserv={reserv} />
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
    const rest = await RestaurantService.getRestaurantByToken(token);
    let wildcard = req.headers.host.split('.')[0];

    if (wildcard === 'www') {
        return {
            redirect: {
                destination: `http://${rest.name}.${process.env.BASE_URL}.com/customers`,
                permanent: false,
            },
        };
    }

    const reserv = await RestaurantService.getReservationByDate(rest.id, date);
    return {
        props: {
            restName: rest.name,
            reserv,
        },
    };
}
