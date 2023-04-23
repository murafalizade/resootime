import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { openModal, selectChoosenTable } from '@/app/redux/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { formatDate } from '@/app/constants/date';

const ReservationNav = ({ name }: any) => {
    const [startDate, setStartDate] = useState(new Date());
    const selectedTable = useSelector(selectChoosenTable);
    const dispatch = useDispatch();
    const router = useRouter();

    const changeDate = async (date: Date) => {
        setStartDate(date);
        const pathName = Router.pathname;
        Router.push(
            `/${pathName}?date=${date.toLocaleDateString(formatDate.locale)}`,
        );
    };

    const openReservationModal = () => {
        if (selectedTable) {
            dispatch(openModal());
        } else {
            alert('Zəhmət olmasa masa seçin');
        }
    };

    useEffect(() => {
        if (router.pathname === '/restaurant/reservations') {
            let { date } = router.query;
            if (!date || typeof date !== 'string') {
                date = new Date().toLocaleDateString(formatDate.locale);
            }
            let parts = date.split('/');
            date = `${parts[1]}/${parts[0]}/${parts[2]}`;
            setStartDate(new Date(date));
        }
    }, [router]);

    return (
        <div className="px-5">
            <nav className="navbar d-flex justify-content-between">
                <div className='sm-none'>
                    <h4 className="text-light p-2">{name}</h4>
                </div>
                <div>
                    <ReactDatePicker
                        selected={startDate}
                        dateFormat="MMM, dd"
                        className="bg-dark mx-5 c-white border-0 text-center p-1"
                        onChange={(date: Date) => changeDate(date)}
                    />
                </div>
                <div className='d-none d-md-block'>
                    {router.pathname === '/restaurant/reservations' ? (
                        <button
                            onClick={openReservationModal}
                            className="btn btn-primary rounded text-nowrap sm-m-0">
                            Yeni rezervasiya
                        </button>
                    ) : null}
                </div>
            </nav>
        </div>
    );
};

export default ReservationNav;
