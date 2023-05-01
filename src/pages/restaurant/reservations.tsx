import RestaurantService from '@/app/api/services/restaurantService';
import ReservationList from '@/app/components/reservation/reservationList';
import ReservationMap from '@/app/components/reservation/reservationMap';
import { selectIsModelOpen } from '@/app/redux/commonSlice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import withClient from '@/app/hoc/withClient';
import ReservationNav from '@/app/components/reservation/reservationNav';
import InlineMenu from '@/app/components/reservation/inlineMenu';
import Cookie from '@/app/utils/Cookie';
import { formatDate } from '@/app/constants/date';
import { useRouter } from 'next/router';

const Reservations = ({ rest, rsx }: any) => {
    const isModalOpen = useSelector(selectIsModelOpen);
    // const router = useRouter()
    // const { id } = router.query

    // useEffect(() => {
    //   window.location.replace(`http://${id}.localhost:3000/reservations`)
    // }, [id])

    return (
        <>
            {isModalOpen ? <div className="overlay"></div> : null}
            <main
                style={{ backgroundColor: '#212841' }}
                className="d-block d-xxl-inline-block">
                <ReservationNav name={rest.name} />
                <div className="d-flex d-md-inline-flex">
                    <InlineMenu />
                    <ReservationList reserv={rsx} />
                    <ReservationMap restId={rest.id} />
                </div>
            </main>
        </>
    );
};

export default withClient(Reservations);

// SSR
export async function getServerSideProps(context: any) {
    const { req, query } = context;
    let { date } = query;
    const token = Cookie.getFromSSR(req, 'token');

    const rest = await RestaurantService.getRestaurantByToken(token);
    if (!date) {
        date = new Date().toLocaleDateString(formatDate.locale);
    }
    const rsx = await RestaurantService.getReservationByDate(rest.id, date);
    return {
        props: {
            rest: rest,
            rsx: rsx,
        },
    };
}
