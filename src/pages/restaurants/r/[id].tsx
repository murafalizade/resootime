import DateFinder from '@/app/components/reservation/dateFinder';
import Table from '@/app/components/restaurant/table';
import {
    filterTables,
    makeLoading,
    selectFilteredTables,
    selectIsLoading,
    selectIsModelOpen,
} from '@/app/redux/commonSlice';
import Image from 'next/dist/client/image';
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
import Menu from '@/app/components/reservation/menu';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ReservationRestaurant = ({ res }: any) => {
    const isModalOpen = useSelector(selectIsModelOpen);
    const dispatch = useDispatch();
    const resTable = useSelector(selectFilteredTables);
    const isLoading = useSelector(selectIsLoading);
    const [wall, setWall] = useState('');
    const [date, setDate] = useState(new Date());
    const [canEdit, setCanEdit] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const resDes =
        'Gənc şəfxanə Həsənov tərəfindən yaradılan Marivanna restoranı, zəngin Azərbaycan mətbəxi ənənələrini modern bir şəkildə təqdim edir. Restoranın interyeri, mətbəxin zənginliyinə uyğun olaraq tərtib edilmişdir. Burada təklif olunan yeməklər, ən peşəkar dadlara sahib Azərbaycan və rus mətbəxləri üsullarına uyğun olaraq Marivanna restoranı, zəngin Azərbaycan mətbəxi ənənələrini modern bir şəkildə təqdim edir. Restoranın interyeri, mətbəxin zənginliyinə uyğun olaraq tərtib edilmişdir. Burada təklif olunan yeməklər, ən peşəkar dadlara sahib Azərbaycan və rus mətbəxləri üsullarına uyğun olaraq';

    const getTables = async () => {
        const map = await RestaurantService.getTables(res.id);
        setWall(map?.wall);
        const filterTable = await RestaurantService.getAvailableTables(
            res.id,
            date.toLocaleDateString(formatDate.locale),
            1,
        );
        dispatch(filterTables(filterTable));
    };

    useEffect(() => {
        dispatch(makeLoading());
        getTables();
        dispatch(makeLoading());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(res);

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
                <main className="mb-lg-5 pb-5">
                    {isModalOpen ? <div className="overlay"></div> : null}
                    <div
                        className={`d-flex flex-column d-block d-lg-none position-relative`}>
                        <button
                            className={`${styles.heart_icon}`}
                            onClick={() => {
                                setIsClicked(!isClicked);
                            }}>
                            {!isClicked && <FiHeart />}
                            {isClicked && <FaHeart />}
                        </button>
                        <div
                            className={`d-flex flex-column ${styles.img_container}`}>
                            {res.images?.map((image: any) => (
                                <Image
                                    key={image.id}
                                    src={
                                        image.id == 1 && baseUrl + image?.image
                                    }
                                    alt={res.name}
                                    width={386}
                                    height={300}
                                    className="w-100 object-fill"
                                />
                            ))}
                        </div>
                        {res.images?.length > 1 && (
                            <button
                                className={`${styles.show_img_btn}`}>{`Bütün şəkillər (+${
                                res.images?.length - 1
                            })`}</button>
                        )}
                    </div>
                    <div className="container fluid mt-lg-5 pb-3 pb-lg-5 px-lg-0">
                        <div className="row">
                            <div className="col-12 col-lg-7 pe-lg-5">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h1
                                            className={`mt-4 mt-lg-0 mb-0 mb-lg-1 ${styles.res_name}`}>
                                            {res.name}
                                        </h1>
                                        <div className="d-flex flex-lg-column">
                                            <h4
                                                className={`d-flex align-items-center me-3 ${styles.res_type}`}>
                                                {res.type?.map(
                                                    (type: any) => type?.type,
                                                )}
                                            </h4>
                                            <span
                                                className={`d-lg-flex d-none ${styles.res_rating}`}>
                                                <StarsRating
                                                    count={5}
                                                    style={{
                                                        style: {
                                                            fontSize: '1.5rem',
                                                        },
                                                    }}
                                                    disabled
                                                    value={res.rate ?? 0}
                                                />
                                                <span
                                                    className={`fs-4 fw-bold ${styles.res_description}`}>
                                                    {`${res.rate ?? 0}.0`}
                                                </span>
                                            </span>
                                            <span
                                                className={`d-flex d-lg-none align-items-center justify-content-center ${styles.res_rating}`}>
                                                <StarsRating
                                                    count={1}
                                                    style={{
                                                        style: {
                                                            fontSize: '1.5rem',
                                                            marginRight:
                                                                '-0.2rem',
                                                            marginTop:
                                                                '-0.2rem',
                                                        },
                                                    }}
                                                    disabled
                                                    value={res.rate ?? 0}
                                                />
                                                <span
                                                    className={`fs-5 fw-bold ${styles.res_description}`}>
                                                    {`${res.rate ?? 0}.0`}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex d-lg-none align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg mt-4 mb-2">
                                            Menyu
                                        </button>
                                    </div>
                                </div>
                                <hr className="d-lg-block d-none" />
                                <p
                                    className={`d-lg-block d-none ${styles.res_description}`}>
                                    {showMore
                                        ? resDes
                                        : `${resDes.substring(0, 317)}...`}{' '}
                                    <br />
                                    <button
                                        className={`${styles.res_description} ${styles.description_link}`}
                                        onClick={() => {
                                            setShowMore(!showMore);
                                        }}>
                                        {!showMore ? '+ Daha çox' : '- Daha az'}
                                    </button>
                                </p>
                                <div
                                    className={`d-flex align-items-center justify-content-between py-2 py-lg-0 ${styles.tag_container}`}>
                                    <div className="d-flex align-items-center justify-content-between py-3 py-lg-0">
                                        <div
                                            className={`rounded-pill ${styles.tags}`}>
                                            {res.tag?.map(
                                                (tag: any) => tag?.name,
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`col-5 d-none d-lg-block position-relative`}>
                                <button
                                    className={`${styles.heart_icon}`}
                                    onClick={() => {
                                        setIsClicked(!isClicked);
                                    }}>
                                    {!isClicked && <FiHeart />}
                                    {isClicked && <FaHeart />}
                                </button>
                                <div
                                    className={`d-flex flex-column ${styles.img_container}`}>
                                    {res.images?.map((image: any) => (
                                        <Image
                                            key={image.id}
                                            src={
                                                image.id == 1 &&
                                                baseUrl + image?.image
                                            }
                                            alt={res.name}
                                            width={386}
                                            height={300}
                                            className="w-100 rounded object-fill"
                                        />
                                    ))}
                                </div>
                                {res.images?.length > 1 && (
                                    <button
                                        className={`${styles.show_img_btn}`}>{`Bütün şəkillər (+${
                                        res.images?.length - 1
                                    })`}</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="container fluid px-lg-0">
                        <div className="row d-flex flex-lg-row md-reverse">
                            <div className="col-12 col-lg-7 pe-lg-5 order-first">
                                <div>
                                    <h4
                                        className={`d-inline d-lg-none fw-bold`}>
                                        Masanızı Seçin
                                    </h4>
                                    <div
                                        onClick={() => setCanEdit(!canEdit)}
                                        className={`position-relative border bg-dark mb-4 mt-4 mt-lg-0 ${styles.map}`}
                                        style={{
                                            height: '600px',
                                            borderRadius: '15px',
                                        }}>
                                        <div
                                            style={{ zIndex: 2 }}
                                            className="text-light p-3">
                                            <div className="d-flex my-2 align-items-center justify-content-center">
                                                <span
                                                    className={`d-none d-lg-inline ${styles.bottom_border}`}>
                                                    Masanızı Seçin
                                                </span>
                                                <br />
                                            </div>
                                        </div>
                                        {isLoading ? (
                                            <Loading
                                                className={styles.map_loader}
                                            />
                                        ) : null}
                                        <TransformWrapper
                                            initialScale={0.75}
                                            minScale={0.5}
                                            maxScale={2}
                                            disabled={canEdit}
                                            limitToBounds={false}>
                                            <TransformComponent
                                                wrapperStyle={{
                                                    height: '520px',
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
                                                            table={table}
                                                        />
                                                    ),
                                                )}
                                            </TransformComponent>
                                        </TransformWrapper>
                                    </div>
                                    <div
                                        className={`pb-2 pt-2 ${styles.notes}`}>
                                        <h5 className={`${styles.fw_600}`}>
                                            Qeydlər
                                        </h5>
                                        <p>
                                            Saat 12:00-dan 00:00-a kimi
                                            işləyirik 23:40-da mətbəx bağlanır /
                                            Siz ancaq kiçik heyvanları
                                            kabinetdən çıxarmadan gələ
                                            bilərsiniz /Kabinetlərdə siqaret
                                            çəkmək olar / Özünüzlə tort gətirə
                                            bilərsiniz pulsuz. / Gətirdiyiniz
                                            hər spirtli içki üçün 20 manat
                                            ödəmək lazımdır
                                        </p>
                                    </div>
                                    <div className="d-none d-lg-block mt-2">
                                        <Menu />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 col-12 col-lg-5 order-lg-first">
                                <DateFinder
                                    allowed={res.is_allowed}
                                    restId={res.id}
                                    restImage={
                                        res.images[0]?.image
                                            ? baseUrl + res.images[0]?.image
                                            : '/images/rest_imag.png'
                                    }
                                    data={res.online_reserv_hours}
                                    restName={res.name}
                                />
                                <div className="d-none d-lg-flex">
                                    <RestInfo
                                        name={res.name}
                                        phone={res.phone}
                                        location={res.location}
                                        workingTime={res.working_hours}
                                        googleMapLink={res.googleMapLink}
                                        instagramLink={res.instagramLink}
                                        facebookLink={res.facebookLink}
                                    />
                                </div>
                                <div className="d-none d-lg-block">
                                    <AdditionalInfo
                                        cuisine={res.cuisine}
                                        parking={res.parking}
                                        payment={res.payment}
                                        maximumPrice={res.maximum_price}
                                        minimumPrice={res.minimum_price}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-lg-none d-flex">
                            <AllRestInfo
                                phone={res.phone}
                                location={res.location}
                                workingTime={res.working_hours}
                                googleMapLink={res.googleMapLink}
                            />
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
    const id = params?.id;
    let wildcard = req.headers.host?.split('.')[0];
    if (wildcard !== 'localhost:3000') {
        return {
            redirect: {
                destination: `http://localhost:3000/restaurants/r/${id}`,
                permanent: false,
            },
        };
    }

    const res = await RestaurantService.getRestaurant(id! as string);
    return { props: { res } };
};
