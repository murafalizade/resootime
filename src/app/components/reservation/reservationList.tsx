import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/ReservationList.module.scss';
import IReservation from '@/app/types/IReservartion';
import Util from '@/app/utils/Util';
import { BsFillPeopleFill } from 'react-icons/bs';

const ReservationList = ({ reserv }: { reserv: IReservation[] }) => {
    // Search state
    const [search, setSearch] = useState('');

    // Reservations state
    const [reservations, setReservations] = useState(reserv);

    // Search function
    const searchGuest = () => {
        const filteredReservations = reserv.filter((r) => {
            return r.user_id
                ? `${r.user_id?.first_name} ${r.user_id?.last_name}`
                      .toLowerCase()
                      .includes(search.toLowerCase())
                : `${r.first_name} ${r.last_name}`
                      .toLowerCase()
                      .includes(search.toLowerCase());
        });
        setReservations(filteredReservations);
    };

    useEffect(() => {
        searchGuest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        setReservations(reserv);
    }, [reserv]);

    return (
        <div className={`${styles.rlist} ms-2 rounded d-none d-md-block`}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Müştəri axtar"
                className="form-control bg-dark text-light w-75 p-2 m-4 text-center"
            />
            <ul className={styles.list_group}>
                {reservations.length != 0 ? (
                    reservations?.map((r) => (
                        <li key={r.id} className={styles.list_group_item}>
                            <div className="d-flex pb-2  justify-content">
                                <div className={styles.list_square}>
                                    <h5 className={styles.list_text}>
                                        <b>{r.date.slice(10)}</b>
                                    </h5>
                                </div>
                                <div className="">
                                    <h5 className={styles.list_text}>
                                        {r.user_id
                                            ? `${r.user_id.first_name} ${r.user_id.last_name}`
                                            : `${r.first_name} ${r.last_name}`}
                                    </h5>
                                    <span className={styles.list_text}>
                                        {r.user_id?.phone_number ||
                                            r.phone_number}
                                        <br />
                                    </span>
                                    <span
                                        className={`${styles.list_text} text-nowrap`}>
                                        {r.table_id.count} <BsFillPeopleFill />
                                    </span>
                                </div>
                                <div className="border h-25 py-1 d-flex justify-content-center rounded align-items-center px-3 ms-auto">
                                    <h5
                                        className={`text-light ${styles.list_text}`}>
                                        {r.table_id.name}
                                    </h5>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <h5 className="text-center text-muted">
                        Rezervasiya tapılmadı!
                    </h5>
                )}
            </ul>
        </div>
    );
};

export default ReservationList;
