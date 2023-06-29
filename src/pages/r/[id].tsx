import DateFinder from '@/app/components/reservation/dateFinder';
import Table from '@/app/components/restaurant/table';
import {
    filterTables,
    makeLoading,
    selectFilteredTables,
    selectIsLoading,
    selectIsModelOpen,
} from '@/app/redux/commonSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/app/components/layout/layout';
import RestaurantService from '@/app/api/services/restaurantService';
import baseUrl from '@/app/constants/baseUrl';
import withAuth from '@/app/hoc/withAuth';
import { Loading } from '@/app/components/layout/loading';
import Head from 'next/head';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import RestInfo from '@/app/components/reservation/restInfo';
import AllRestInfo from '@/app/components/reservation/allRestInfo';
import styles from '@/app/styles/CreateMapTool.module.scss';
import { GetServerSideProps } from 'next';
import { formatDate } from '@/app/constants/date';
import StarsRating from 'react-star-rate';
import AdditionalInfo from '@/app/components/reservation/additionalInformation';
import ResMenu from '@/app/components/reservation/resMenu';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import GalleryModal from '@/app/components/reservation/galleryModal';
import UserService from '@/app/api/services/userService';
import Cookie from '@/app/utils/Cookie';
import { MdAssistantNavigation } from 'react-icons/md';

const ReservationRestaurant = ({ res }: any) => {
    const isModalOpen = useSelector(selectIsModelOpen);
    const dispatch = useDispatch();
    const resTable = useSelector(selectFilteredTables);
    const isLoading = useSelector(selectIsLoading);
    const [wall, setWall] = useState('');
    const [initialScale, setInitialScale] = useState(0.75);
    const [canEdit, setCanEdit] = useState(false);
    const [showMore, setShowMore] = useState(res.description.length < 317);
    const [isClicked, setIsClicked] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const MemoizedTransformWrapper = React.memo(TransformWrapper);

    const getTables = async () => {
        const map = await RestaurantService.getTables(res.id);
        setWall(map?.wall);
        // const filterTable = await RestaurantService.getAvailableTables(
        //     res.id,
        //     date.toLocaleDateString(formatDate.locale),
        //     1,
        // );
        dispatch(filterTables(map?.table));
    };
    const twoFingerDetection = (event: any) => {
        if (event.touches.length === 2) {
            setCanEdit(true);
        }
    };
    const twoFingerPan = (event: any, rootPage: boolean = false) => {
        if (event.ctrlKey && !rootPage) {
            setCanEdit(true);
        } else {
            setCanEdit(false);
        }
    };

    useEffect(() => {
        const handleZoom = (event: any) => {
            if (event.ctrlKey) {
                event.preventDefault();

                // Your zoom logic for the specific div
                // Perform the necessary zoom operations on divElement
            }
        };

        window.addEventListener('wheel', handleZoom, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleZoom);
        };
    }, []);

    useEffect(() => {
        dispatch(makeLoading());
        getTables();
        dispatch(makeLoading());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const likeRestaurant = async () => {
        const token = Cookie.get('token');
        if (token) {
            await UserService.likeRestaurant(res.id, token);
            setIsClicked(!isClicked);
        } else {
            alert('Zəhmət olmasa daxil olun');
        }
    };

    return (
        <>
            <Head>
                <title>{res.name} | ResooTime.com</title>
                <meta
                    name="description"
                    content={`Indi istənilən vaxta masanı seçib rezerv et. ${res.name} - ${res.description}`}
                />
                <meta
                    name="keywords"
                    content={`${res.name}, restoran, rezerv et, restoran ${res.location}, rezervasiya et, masani sec, rezervasiya, masa,  ${res.category?.name}`}
                />
                <meta name="og:title" content={`${res.name} | ResooTime.com`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <meta
                    property="og:description"
                    content={`Indi istənilən vaxta masanı seçib rezerv et. ${res.name} - ${res.description}`}
                />
                <meta property="og:site_name" content="ResooTime" />
            </Head>
            <Layout>
                <main
                    onWheel={(e) => (!e.ctrlKey ? setCanEdit(false) : null)}
                    className="mb-md-5 pb-5 details-page">
                    {isModalOpen ? <div className="overlay"></div> : null}
                    {isGalleryOpen ? (
                        <GalleryModal
                            setIsGalleryOpen={setIsGalleryOpen}
                            images={res.images}
                        />
                    ) : null}
                    <div className="main-container">
                        <div
                            className={`d-flex flex-column position-relative d-md-none`}>
                            <div
                                className={`d-flex flex-column ${styles.img_container}`}>
                                {res.images?.map((image: any) => (
                                    <Image
                                        key={image.id}
                                        src={
                                            res.images[0]?.image
                                                ? baseUrl + res.images[0]?.image
                                                : '/images/rest_imag.png'
                                        }
                                        alt={res.name}
                                        width={386}
                                        height={300}
                                        className={`w-100 ${styles.banner_img}`}
                                    />
                                ))}
                            </div>
                            {res.images?.length > 1 && (
                                <a
                                    href={`/r/gallery/${res.slug}`}
                                    className={`${styles.show_img_btn}`}>{`Bütün şəkillər (+${
                                    res.images?.length - 1
                                })`}</a>
                            )}
                        </div>
                        <div className="px-3 px-md-0">
                            <div className="container fluid mt-md-4 pt-md-2 px-3 px-md-0 pb-md-44">
                                <div className="row row-width">
                                    <div className="col-12 col-md-7 pe-md-5 ps-md-0">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h1
                                                    className={`mt-4 mt-md-0 mb-0 mb-md-1 res-name ${styles.res_name}`}>
                                                    {res.name}
                                                </h1>
                                                <div className="d-flex flex-md-column">
                                                    <div className="d-flex">
                                                        {res.type?.map(
                                                            (
                                                                type: any,
                                                                index: any,
                                                            ) => (
                                                                <span
                                                                    className={`d-flex align-items-center me-1 ${styles.res_type}`}
                                                                    key={
                                                                        type?.id
                                                                    }>
                                                                    {index ==
                                                                    res.type
                                                                        .length -
                                                                        1
                                                                        ? `${type?.type}`
                                                                        : `${type?.type} |`}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`d-md-flex d-none align-items-center ${styles.res_rating}`}>
                                                        <StarsRating
                                                            count={5}
                                                            style={{
                                                                style: {
                                                                    fontSize:
                                                                        '1.2rem',
                                                                },
                                                            }}
                                                            disabled
                                                            value={
                                                                res.rate ?? 0
                                                            }
                                                        />
                                                        <span
                                                            className={`fs-6 fw-bold ${styles.res_description}`}>
                                                            {`${
                                                                res.rate ?? 0
                                                            }.0`}
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={`d-flex d-md-none align-items-center justify-content-center ps-2 ${styles.res_rating}`}>
                                                        <StarsRating
                                                            count={1}
                                                            style={{
                                                                style: {
                                                                    fontSize:
                                                                        '1.2rem',
                                                                    marginRight:
                                                                        '-0.5rem',
                                                                    marginTop:
                                                                        '-0.1rem',
                                                                },
                                                            }}
                                                            disabled
                                                            value={
                                                                res.rate ?? 0
                                                            }
                                                        />
                                                        <span
                                                            className={`fs-5 fw-bold ${styles.res_description}`}>
                                                            {`${
                                                                res.rate ?? 0
                                                            }.0`}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="d-flex d-md-none align-items-center">
                                                <a
                                                    type="button"
                                                    className="btn btn-primary btn-md mt-3 mb-2"
                                                    href={`/r/menu/${res.slug}`}>
                                                    Menyu
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="d-md-block d-none my-2" />
                                        {res.description && (
                                            <p
                                                className={`d-md-block d-none ${styles.res_description}`}>
                                                {showMore
                                                    ? res.description
                                                    : `${res.description.substring(
                                                          0,
                                                          317,
                                                      )}...`}
                                                <br />
                                                {!showMore ? (
                                                    <button
                                                        className={`${styles.res_description} ${styles.description_link}`}
                                                        onClick={() => {
                                                            setShowMore(
                                                                !showMore,
                                                            );
                                                        }}>
                                                        {!showMore
                                                            ? '+ Daha çox'
                                                            : '- Daha az'}
                                                    </button>
                                                ) : null}
                                            </p>
                                        )}
                                        <div
                                            className={`d-flex align-items-center justify-content-between py-2 py-md-0 ${styles.tag_container}`}>
                                            <div className="d-flex align-items-center justify-content-between pt-2 pb-3 py-md-0">
                                                {res.tag?.map((tag: any) => (
                                                    <div
                                                        className={`rounded-pill ${styles.tags}`}
                                                        key={tag.id}>
                                                        {tag?.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`col-5 d-none d-md-block position-relative ps-md-0`}>
                                        {/* <button
                                            className={`d-flex align-items-center justify-content-center ${styles.heart_icon}`}
                                            onClick={() => {
                                                likeRestaurant();
                                            }}>
                                            {!isClicked && <FiHeart />}
                                            {isClicked && <FaHeart />}
                                        </button> */}
                                        <div
                                            className={`d-flex flex-column ${styles.img_container}`}>
                                            <Image
                                                src={
                                                    res.images[0]?.image
                                                        ? baseUrl +
                                                          res.images[0]?.image
                                                        : '/images/rest_imag.png'
                                                }
                                                alt={res.name}
                                                width={353}
                                                height={272}
                                                className={`w-100 ${styles.banner_img}`}
                                            />
                                        </div>
                                        {res.images?.length > 1 && (
                                            <button
                                                className={`${styles.show_img_btn}`}
                                                onClick={() => {
                                                    setIsGalleryOpen(true);
                                                }}>{`Bütün şəkillər (+${
                                                res.images?.length - 1
                                            })`}</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="container fluid px-md-0">
                                <div className="row d-flex flex-md-row md-reverse row-width">
                                    <div className="col-12 col-md-7 pe-md-5 order-first ps-md-0">
                                        <div>
                                            <div className="d-flex d-md-none align-items-center justify-content-between mt-4">
                                                <h4
                                                    className={`fw-bold modal-title`}>
                                                    Masanızı Seçin
                                                </h4>
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className={`me-1 ${styles.green_circle}`}></div>
                                                    <span
                                                        className={`${styles.empty_tables}`}>
                                                        Boş masalar
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                onWheel={(e) => twoFingerPan(e)}
                                                onTouchMove={(e) =>
                                                    twoFingerDetection(e)
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Control') {
                                                        setCanEdit(true);
                                                    }
                                                }}
                                                onKeyUp={(event) => {
                                                    if (
                                                        event.key === 'Control'
                                                    ) {
                                                        setCanEdit(false);
                                                    }
                                                }}
                                                className={`overflow-hidden position-relative border bg-dark mb-4 mt-4 mt-md-0 ${styles.map}`}
                                                style={{
                                                    height: '23.5rem',
                                                    borderRadius: '15px',
                                                }}>
                                                <div
                                                    style={{ zIndex: 2 }}
                                                    className="text-light">
                                                    <div>
                                                        <div className="d-none d-md-flex my-2 align-items-center justify-content-between">
                                                            <div className="w-25"></div>
                                                            <span
                                                                className={` ${styles.bottom_border}`}>
                                                                Masanızı Seçin
                                                            </span>
                                                            <div className="d-flex align-items-center w-25">
                                                                <div
                                                                    className={`me-1 ${styles.green_circle}`}></div>
                                                                <span
                                                                    className={`${styles.empty_tables}`}>
                                                                    Boş masalar
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <br className="d-none d-md-block" />
                                                    </div>
                                                </div>
                                                {isLoading ? (
                                                    <Loading
                                                        className={
                                                            styles.map_loader
                                                        }
                                                    />
                                                ) : null}
                                                <MemoizedTransformWrapper
                                                    initialScale={initialScale}
                                                    minScale={0.5}
                                                    maxScale={2}
                                                    wheel={{
                                                        step: 50,
                                                    }}
                                                    disabled={!canEdit}
                                                    limitToBounds={false}>
                                                    <TransformComponent
                                                        wrapperStyle={{
                                                            maxHeight: '28rem',
                                                            width: '98.5%',
                                                            marginLeft: '5px',
                                                        }}>
                                                        {wall ? (
                                                            <Image
                                                                className={`position-relative ${styles.image}`}
                                                                src={wall}
                                                                alt={res.name}
                                                                fill
                                                                objectFit="contain"
                                                            />
                                                        ) : null}
                                                        {resTable?.map(
                                                            (
                                                                table: any,
                                                                index: number,
                                                            ) => (
                                                                <Table
                                                                    key={index}
                                                                    table={
                                                                        table
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </TransformComponent>
                                                </MemoizedTransformWrapper>
                                                <div
                                                    onClick={() => {
                                                        setInitialScale(0.5);
                                                    }}
                                                    className="text-light position-absolute bottom-0 end-0 p-3">
                                                    <MdAssistantNavigation
                                                        size={25}
                                                    />
                                                </div>
                                            </div>
                                            {res.notes && (
                                                <div
                                                    className={`pt-3 ${styles.notes}`}>
                                                    <h5 className={`fw-600`}>
                                                        Qeydlər
                                                    </h5>
                                                    <p>{res.notes}</p>
                                                </div>
                                            )}
                                            <div className="d-none d-md-block mt-5">
                                                <ResMenu
                                                    id={res.id}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-5 order-md-first ps-md-0">
                                        <div className="pb-md-44 mb-4 mb-md-0">
                                            <DateFinder
                                                allowed={res.is_allowed}
                                                restId={res.id}
                                                restImage={
                                                    res?.images[0]?.image
                                                        ? baseUrl +
                                                          res.images[0]?.image
                                                        : '/images/rest_imag.png'
                                                }
                                                data={res.online_reserv_hours}
                                                restName={res.name}
                                            />
                                        </div>
                                        <div className="d-none d-md-flex">
                                            <RestInfo
                                                name={res.name}
                                                phone={res.phone}
                                                location={res.location}
                                                workingTime={res.working_hours}
                                                googleMapLink={
                                                    res.googleMapLink
                                                }
                                                websiteLink={res.websiteLink}
                                                instagramLink={
                                                    res.instagramLink
                                                }
                                                facebookLink={res.facebookLink}
                                            />
                                        </div>
                                        <div className="d-none d-md-block">
                                            <AdditionalInfo
                                                cuisine={res.cuisine}
                                                parking={res.parking}
                                                payment={res.payment}
                                                maximumPrice={res.maximum_price}
                                                minimumPrice={res.minimum_price}
                                                serviceCharge={
                                                    res.service_charge
                                                }
                                                minimumAge={res.minimum_age}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onWheel={(e) => console.log(e, 'Event')}
                                    onClick={(e) => console.log(e, 'ad')}
                                    className="d-md-none d-flex">
                                    <AllRestInfo
                                        phone={res.phone}
                                        location={res.location}
                                        workingTime={res.working_hours}
                                        googleMapLink={res.googleMapLink}
                                        websiteLink={res.websiteLink}
                                        cuisine={res.cuisine}
                                        parking={res.parking}
                                        payment={res.payment}
                                        maximumPrice={res.maximum_price}
                                        minimumPrice={res.minimum_price}
                                        instagramLink={res.instagramLink}
                                        facebookLink={res.facebookLink}
                                        description={res.description}
                                        serviceCharge={res.service_charge}
                                        minimumAge={res.minimum_age}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
};

export default withAuth(ReservationRestaurant, false);

export const getServerSideProps: GetServerSideProps = async ({
    params,
    req,
}) => {
    let id = params?.id?.toString();
    const res = await RestaurantService.getRestaurant(id as string);
    return { props: { res } };
};
