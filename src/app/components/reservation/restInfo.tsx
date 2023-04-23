import React, { Suspense } from 'react';
import styles from '@/app/styles/DateFinder.module.scss';
import { Loading } from '../layout/loading';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';

const RestInfo = ({ workingTime, googleMapLink, location, phone }: any) => {
    return (
        <div className={`mt-3 mb-5 p-4 ${styles.date_finder}`}>
            <div>
                <div style={{ width: '100%' }}>
                    <iframe
                        width="100%"
                        height="250px"
                        src={googleMapLink}
                        loading="lazy"></iframe>
                </div>
            </div>
            <div style={{ color: '#505050' }} className="mt-3">
                <div className="d-flex">
                    <IoLocationSharp
                        className="me-1"
                        style={{ color: '#505050', fontSize: '1.3rem' }}
                    />
                    <div>
                        <span className={styles.info_title}>Ünvan</span>
                        <p className="" style={{ color: '#3366CC' }}>
                            {location}
                        </p>
                    </div>
                </div>
                <hr />
                <div className="d-flex">
                    <BsFillTelephoneFill
                        className="me-1"
                        style={{ color: '#505050', fontSize: '1rem' }}
                    />
                    <div>
                        <span className={styles.info_title}>Nömrə</span>
                        <p className="">{phone}</p>
                    </div>
                </div>
                <hr />

                <div className="d-flex">
                    <AiOutlineClockCircle
                        className="me-1"
                        style={{ color: '#505050', fontSize: '1.3rem' }}
                    />
                    <div className="w-100">
                        <div>
                            <div className="row">
                                <span className={styles.info_title}>
                                    İş vaxtı
                                </span>
                                <div className="col-6">
                                    <ul
                                        className={`text-nowrap lists ${styles.lists} p-0`}>
                                        {workingTime?.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <li key={index}>
                                                        {item.day}
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul
                                        className={`d-flex float-end pe-4 flex-column justify-content-start align-items-start text-nowrap lists ${styles.lists}`}>
                                        {workingTime?.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <li key={index}>
                                                        {item.open_at}-
                                                        {item.close_at}
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestInfo;
