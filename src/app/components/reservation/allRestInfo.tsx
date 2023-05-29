import React, { Suspense } from 'react';
import styles from '@/app/styles/DateFinder.module.scss';
import { Loading } from '../layout/loading';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsInstagram, BsLinkedin } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { ImPhone } from 'react-icons/im';
import { GiReceiveMoney, GiMeal } from 'react-icons/gi';
import { FaRegMoneyBillAlt, FaChild } from 'react-icons/fa';
import { IoMdCard } from 'react-icons/io';
import { CiParking1 } from 'react-icons/ci';
import { RiPagesLine } from 'react-icons/ri';

const allRestInfo = ({ workingTime, googleMapLink, location, phone }: any) => {
    return (
        <div
            className={`mt-3 mb-5 p-0 ${styles.date_finder} ${styles.all_rest_info}`}>
            <div>
                <div style={{ width: '100%' }}>
                    <iframe
                        width="100%"
                        height="250px"
                        src={googleMapLink}
                        loading="lazy"
                        style={{
                            borderRadius: '10px',
                        }}></iframe>
                </div>
            </div>
            <div style={{ color: '#505050' }} className="mt-3">
                <div className="d-flex">
                    <IoLocationSharp className={`me-3 ${styles.icon}`} />
                    <p
                        className={`btn-link text-decoration-none link main-color ${styles.map_link} ${styles.location_link}`}>
                        {location}
                    </p>
                </div>
                <hr />
                <div className="d-flex main-color py-2">
                    <ImPhone className={`fs-4 me-3 ${styles.icon}`} />
                    <span>{phone}</span>
                </div>
                <hr />
                <div className="d-flex main-color py-2">
                    <TbWorld className={`me-3 ${styles.icon}`} />
                    <span>http://www.marivanna.az/</span>
                </div>
                <hr />
                <div className="me-4 py-2">
                    <a
                        className={`my-3 link ${styles.social_media_icon}`}
                        href="https://instagram.com/resootime?igshid=YmMyMTA2M2Y="
                        target="_blank"
                        rel="noreferrer">
                        <BsInstagram size={'1.5em'} />
                    </a>
                    <a
                        className={`my-3 ms-4 link ${styles.social_media_icon}`}
                        href="https://www.linkedin.com/company/resootime/"
                        target="_blank"
                        rel="noreferrer">
                        <BsLinkedin size={'1.5em'} />
                    </a>
                </div>
                <hr />
                <div className="d-flex pt-2">
                    <AiOutlineClockCircle className={`me-3 ${styles.icon}`} />
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
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <GiMeal
                            className={`me-2 ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>Mətbəx</span>
                    </div>
                    <span
                        className={`d-flex align-items-center ${styles.info}`}>
                        Azərbaycan, rus
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <GiReceiveMoney
                            className={`me-2 ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>
                            Servis haqqı
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center ${styles.info}`}>
                        7%
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <FaChild
                            className={`me-2 ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>
                            Min. yaş həddi{' '}
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center ${styles.info}`}>
                        10+
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <FaRegMoneyBillAlt
                            className={`me-2 ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>
                            Ortalama qiymət
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center ${styles.info}`}>
                        25-60 azn
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <IoMdCard
                            className={`me-2 ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>
                            Ödəniş variantları
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center ${styles.info}`}>
                        Nəğd, kart
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <CiParking1
                            className={`me-2 ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>Parketmə</span>
                    </div>
                    <span
                        className={`d-flex align-items-center ${styles.info}`}>
                        Şəxsi, ictimai
                    </span>
                </div>
                <hr />
                <div className=" me-2 py-2">
                    <div className="d-flex">
                        <div>
                            <RiPagesLine
                                className={`me-2 ${styles.icon}`}
                                style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                            />
                        </div>
                        <div>
                            <span className={`${styles.info_type}`}>
                                Təsvir
                            </span>
                            <p className={``}>
                                Azərbaycanın dadlarını yenilikçi bir tərzdə
                                yenidən təqdim edən Marivanna Restoranının
                                Bakıda zövqünü yaşayın.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default allRestInfo;
