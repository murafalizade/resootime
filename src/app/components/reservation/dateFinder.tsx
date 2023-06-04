import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/DateFinder.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterTables,
    makeLoading,
    openModal,
    selectChoosenTable,
} from '@/app/redux/commonSlice';
import ReservationModal from './reservationModal';
import RestaurantService from '@/app/api/services/restaurantService';
import { formatDate } from '@/app/constants/date';
import { weekDay } from '@/app/constants/weekDay';

interface DateFinderProps {
    restName: string;
    restImage: string;
    restId: number;
    allowed?: boolean;
    data: any;
}

const DateFinder = ({
    restName,
    restImage,
    restId,
    allowed = false,
    data,
}: DateFinderProps) => {
    // dates
    const now = new Date();
    const days = weekDay;
    const [noAllowed, setNoAllowed] = useState(false);
    const getMinHour = (now: Date) => {
        const time = data.find(
            (item: any) => item.day === days[now.getDay()].name,
        )?.open_at;
        const today = new Date();
        console.log(time);
        if (!time) {
            return ['23', '59'];
        }
        if (today.getTime() >= now.getTime()) {
            return time.split(':');
        } else {
            return [today.getHours(), today.getMinutes()];
        }
    };

    const getMaxHour = (now: Date) => {
        const time = data.find(
            (item: any) => item.day === days[now.getDay()].name,
        )?.close_at;
        if (!time) {
            return ['23', '59'];
        }
        console.log(time);
        return time.split(':');
    };

    const [minTime, setMinTime] = useState(
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            Number(getMinHour(now)[0]),
            Number(getMinHour(now)[1]),
            0,
        ),
    );
    const [maxTime, setMaxTime] = useState(
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            Number(getMaxHour(now)[0]),
            Number(getMaxHour(now)[1]),
            0,
        ),
    );
    const [date, setDate] = useState(now);

    const [count, setCount] = useState(1);

    // tables
    const table = useSelector(selectChoosenTable);
    const dispatch = useDispatch();

    const handleCount = (e: any) => {
        setCount(e.target.value);
    };

    useEffect(() => {
        if (minTime.getTime() < maxTime.getTime()) {
            setNoAllowed(false);
        } else {
            setNoAllowed(true);
            console.log(noAllowed && !allowed);
        }
    }, [minTime, maxTime]);

    // open modal for make reservation
    const makeReservation = async () => {
        if (table) {
            dispatch(openModal());
        } else {
            dispatch(makeLoading());
            const filterTable = await RestaurantService.getAvailableTables(
                restId,
                date.toLocaleDateString(formatDate.locale),
                count,
            );
            dispatch(filterTables(filterTable));
            dispatch(makeLoading());
        }
    };

    // change date
    const handleChangeDate = (date: any) => {
        setDate(date);
        const now = new Date();
        const tomorrow = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        );
        if (date.getTime() >= tomorrow.getTime()) {
            // Allow selecting from 00:01 tomorrow
            setMinTime(
                new Date(
                    tomorrow.getFullYear(),
                    tomorrow.getMonth(),
                    tomorrow.getDate(),
                    Number(getMinHour(tomorrow)[0]),
                    Number(getMinHour(tomorrow)[1]),
                    0,
                ),
            );
            setMaxTime(
                new Date(
                    tomorrow.getFullYear(),
                    tomorrow.getMonth(),
                    tomorrow.getDate(),
                    Number(getMaxHour(tomorrow)[0]),
                    Number(getMaxHour(tomorrow)[1]),
                    0,
                ),
            );
        } else {
            // Set minimum time to now and maximum time to end of day
            setMinTime(
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    Number(getMinHour(now)[0]),
                    Number(getMinHour(now)[1]),
                ),
            );
            setMaxTime(
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    Number(getMaxHour(now)[0]),
                    Number(getMaxHour(now)[1]),
                    0,
                ),
            );
        }
    };

    return (
        <div className={styles.date_finder}>
            <ReservationModal
                restaurant_id={restId}
                date={date}
                people={count}
                hotelName={restName}
                img={restImage}
            />
            <div className="d-flex justify-content-center mb-3">
                <h4 className={`${styles.modal_title}`}>Rezervasiya</h4>
            </div>
            <div className="row d-flex justify-content-around mb-2">
                <div className={`col-4 ${styles.picker_container}`}>
                    <label className={styles.label}>Qonaq sayı</label>
                    <div>
                        <select
                            onChange={(e: any) => handleCount(e)}
                            className={`form-select ps-3 rounded-pill ${styles.picker}`}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>
                <div className={`col-4 ${styles.picker_container}`}>
                    <label className={styles.label}>Tarix</label>
                    <DatePicker
                        selected={date}
                        className={`form-select ps-3 rounded-pill ${styles.picker}`}
                        dateFormat="dd MMM"
                        minDate={now}
                        onChange={handleChangeDate}
                    />
                </div>
                <div className={`col-4 ${styles.picker_container}`}>
                    <label className={styles.label}>Vaxt</label>
                    <DatePicker
                        selected={date}
                        onChange={handleChangeDate}
                        showTimeSelect
                        className={`form-select ps-3 rounded-pill ${styles.picker}`}
                        showTimeSelectOnly
                        timeIntervals={30}
                        minTime={minTime}
                        maxTime={maxTime}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                    />{' '}
                </div>
            </div>

            <button
                type="button"
                disabled={!allowed && noAllowed}
                onClick={makeReservation}
                className={`btn btn-primary btn-lg mt-3 mb-2 ${styles.reservation_btn}`}>
                {table ? `Reserv edin ${table.name}` : 'Masaları axtarın'}
            </button>
            {allowed || noAllowed ? (
                <span className={`text-danger text-center ${styles.warning}`}>
                    Rezervasiya etmək halhazırda mümkün deyil
                </span>
            ) : null}
        </div>
    );
};

export default DateFinder;
