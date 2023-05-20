import React, { Suspense } from 'react';
import styles from '@/app/styles/DateFinder.module.scss';
import { Loading } from '../layout/loading';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { ImPhone } from 'react-icons/im';

const RestInfo = ({ name, workingTime, googleMapLink, location, phone, instagramLink, facebookLink }: any) => {
    return (
        <div className={`mt-3 mb-5 p-0 ${styles.date_finder}`}>
            <div>
                <div style={{ width: '100%' }}>
                    <iframe
                        width="100%"
                        height="250px"
                        src={googleMapLink}
                        loading="lazy"
                        style={{
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                        }}></iframe>
                </div>
            </div>
            <div style={{ color: '#505050' }} className="mt-3">
                <div className='mx-4'>
                    <h4 className={`${styles.res_name}`}>{name}</h4>
                    <p>{location}</p>
                    <a
                        className={`my-3 link ${styles.social_media_icon}`}
                        href={instagramLink}
                        target="_blank"
                        rel="noreferrer">
                        <BsInstagram size={'1.5em'} />
                    </a>
                    <a
                        className={`my-3 ms-4 link ${styles.social_media_icon}`}
                        href={facebookLink}
                        target="_blank"
                        rel="noreferrer">
                        <BsFacebook size={'1.5em'} />
                    </a>
                </div>
                <hr />
                <div className="d-flex">
                    <IoLocationSharp className={`mx-3 ${styles.icon}`} />
                    <a href={googleMapLink} target='_blank' rel='noreferrer' className={`btn-link text-decoration-none link ${styles.map_link}`}>Xəritəyə keç</a>
                </div>
                <hr />
                <div className="d-flex">
                    <ImPhone className={`fs-4 mx-3 ${styles.icon}`} />
                    <span>{phone}</span>
                </div>
                <hr />
                <div className="d-flex">
                    <TbWorld className={`mx-3 ${styles.icon}`} />
                    <span>http://www.marivanna.az/</span>
                </div>
                <hr />
                <div className="d-flex">
                    <AiOutlineClockCircle className={`mx-3 ${styles.icon}`} />
                    <div className="w-100">
                        <div>
                            <div className="row">
                                <span className={styles.info_title}>
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
