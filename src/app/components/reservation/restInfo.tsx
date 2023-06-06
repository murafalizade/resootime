import React, { Suspense } from 'react';
import styles from '@/app/styles/DateFinder.module.scss';
import { Loading } from '../layout/loading';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { ImPhone } from 'react-icons/im';

const RestInfo = ({
    name,
    workingTime,
    googleMapLink,
    location,
    phone,
    instagramLink,
    facebookLink,
    websiteLink,
}: any) => {
    return (
        <div className={`mb-5 p-0 ${styles.date_finder}`}>
            <div>
                <div style={{ width: '100%' }}>
                    <iframe
                        width="100%"
                        height="129px"
                        src={googleMapLink}
                        loading="lazy"
                        style={{
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                        }}></iframe>
                </div>
            </div>
            <div className={`${styles.rest_info}`}>
                <div className="mx-3">
                    <h4 className={`mt-2 mb-0 ${styles.res_name}`}>{name}</h4>
                    <p className={`mb-2 ${styles.location}`}>{location}</p>
                    <a
                        className={`my-2 link ${styles.social_media_icon}`}
                        href={instagramLink}
                        target="_blank"
                        rel="noreferrer">
                        <BsInstagram size={'1.2rem'} />
                    </a>
                    <a
                        className={`my-2 ms-4 link ${styles.social_media_icon}`}
                        href={facebookLink}
                        target="_blank"
                        rel="noreferrer">
                        <BsFacebook size={'1.2rem'} />
                    </a>
                </div>
                <hr />
                <div className="d-flex">
                    <IoLocationSharp className={`mx-3 ${styles.icon}`} />
                    <a
                        href={googleMapLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn-link text-decoration-none link ${styles.map_link} ${styles.info}`}>
                        Xəritəyə keç
                    </a>
                </div>
                <hr />
                <div className="d-flex align-items-center">
                    <ImPhone className={`mx-3 ${styles.icon}`} />
                    <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        className={`btn-link text-decoration-none link ${styles.link} ${styles.info}`}>
                        {phone}
                    </a>
                </div>
                <hr />
                <div className="d-flex align-items-center">
                    <TbWorld className={`mx-3 ${styles.icon}`} />
                    <a
                        href={websiteLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn-link text-decoration-none link ${styles.link} ${styles.info}`}>
                        {websiteLink}
                    </a>
                </div>
                <hr />
                <div className="d-flex">
                    <AiOutlineClockCircle className={`mx-3 ${styles.icon}`} />
                    <div className="w-100">
                        <div>
                            <div className="row">
                                <span className={styles.info_type}>
                                    İş saatları
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
