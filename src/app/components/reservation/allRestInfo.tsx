import React, { Suspense } from 'react';
import styles from '@/app/styles/DateFinder.module.scss';
import { Loading } from '../layout/loading';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsInstagram, BsFacebook } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { ImPhone } from 'react-icons/im';
import { GiReceiveMoney, GiMeal } from 'react-icons/gi';
import { FaRegMoneyBillAlt, FaChild } from 'react-icons/fa';
import { IoMdCard } from 'react-icons/io';
import { LuParkingCircle } from 'react-icons/lu';
import { RiPagesLine } from 'react-icons/ri';

const allRestInfo = ({
    workingTime,
    googleMapLink,
    location,
    phone,
    cuisine,
    parking,
    payment,
    maximumPrice,
    minimumPrice,
    instagramLink,
    facebookLink,
    description,
    serviceCharge,
    websiteLink,
    minimumAge,
}: any) => {
    return (
        <div
            className={`mt-3 mb-5 p-0 ${styles.date_finder} ${styles.all_rest_info} ${styles.additional_info}`}>
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
                <div className="d-flex py-2 align-items-center">
                    <IoLocationSharp className={`me-4 icon ${styles.icon}`} />
                    <p
                        className={`btn-link text-decoration-none link m-0 ${styles.map_link} ${styles.link}`}>
                        {location}
                    </p>
                </div>
                <hr />
                <div className="d-flex py-2 align-items-center">
                    <ImPhone className={`fs-sm-4 me-4 icon ${styles.icon}`} />
                    <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        className={`btn-link text-decoration-none link ${styles.link}`}>
                        {phone}
                    </a>
                </div>
                <hr />
                {websiteLink && (
                    <div className="d-flex py-2 align-items-center">
                        <TbWorld className={`me-4 icon ${styles.icon}`} />
                        <span>{websiteLink}</span>
                    </div>
                )}
                {websiteLink && <hr />}

                <div className="me-4 py-2">
                    {instagramLink && (
                        <a
                            className={`my-3 link ${styles.social_media_icon}`}
                            href={instagramLink}
                            target="_blank"
                            rel="noreferrer">
                            <BsInstagram className="fs-5 icon" />
                        </a>
                    )}

                    {facebookLink && (
                        <a
                            className={`my-3 ms-4 link ${styles.social_media_icon}`}
                            href={facebookLink}
                            target="_blank"
                            rel="noreferrer">
                            <BsFacebook className="fs-5 icon" />
                        </a>
                    )}
                </div>
                {(instagramLink || facebookLink) && <hr />}
                <div className="d-flex">
                    <AiOutlineClockCircle
                        className={`me-4 icon ${styles.icon}`}
                    />
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
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <GiMeal
                            className={`me-3 icon ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>Mətbəx</span>
                    </div>
                    <span
                        className={`d-flex align-items-center pe-3 ${styles.info}`}>
                        <span
                            className={`d-flex align-items-center fw-600 ${styles.info}`}>
                            {cuisine?.map((item: any, index: any) => {
                                return index == cuisine.length - 1
                                    ? `${item?.name}`
                                    : `${item?.name} | `;
                            })}
                        </span>
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <GiReceiveMoney
                            className={`me-3 icon ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>
                            Servis haqqı
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center text-capitalize pe-3 ${styles.info}`}>
                        {serviceCharge ?? 0}%
                    </span>
                </div>
                <hr />
                {minimumAge && (
                    <div className="d-flex justify-content-between me-2 py-2">
                        <div className="d-flex align-items-center">
                            <FaChild
                                className={`me-3 me-sm-4 icon ${styles.icon}`}
                            />
                            <span className={`${styles.info_type}`}>
                                Min. yaş həddi{' '}
                            </span>
                        </div>
                        <span
                            className={`d-flex align-items-center fw-600 pe-3 ${styles.info}`}>
                            {minimumAge}+
                        </span>
                    </div>
                )}
                {minimumAge && <hr />}
                {minimumPrice && maximumPrice && (
                    <div className="d-flex justify-content-between me-2 py-2">
                        <div className="d-flex align-items-center">
                            <FaRegMoneyBillAlt
                                className={`me-3 icon ${styles.icon}`}
                                style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                            />
                            <span className={`${styles.info_type}`}>
                                Ortalama qiymət
                            </span>
                        </div>
                        <span
                            className={`d-flex align-items-center text-capitalize pe-3 ${styles.info}`}>
                            {minimumPrice ?? 0}-{maximumPrice ?? 0} azn
                        </span>
                    </div>
                )}

                {minimumPrice && maximumPrice && <hr />}
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <IoMdCard
                            className={`me-3 icon ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>
                            Ödəniş variantları
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center text-capitalize pe-3 ${styles.info}`}>
                        {`${payment}`}
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <LuParkingCircle
                            className={`me-3 icon ${styles.icon}`}
                            style={{ color: '#6A5DDF', fontSize: '1.8rem' }}
                        />
                        <span className={`${styles.info_type}`}>Parketmə</span>
                    </div>
                    <span
                        className={`d-flex align-items-center text-capitalize pe-3 ${styles.info}`}>
                        {`${parking}`}
                    </span>
                </div>
                {description && <hr />}
                {description && (
                    <div className=" me-2 py-2">
                        <div className="d-flex">
                            <div>
                                <RiPagesLine
                                    className={`me-3 icon ${styles.icon}`}
                                    style={{
                                        color: '#6A5DDF',
                                        fontSize: '1.8rem',
                                    }}
                                />
                            </div>
                            <div>
                                <span className={`${styles.info_type}`}>
                                    Təsvir
                                </span>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default allRestInfo;
