import Head from 'next/head';
import Layout from '@/app/components/layout/layout';
import Card from '@/app/components/card/card';
import RestaurantService from '@/app/api/services/restaurantService';
import { IRestaurant } from '@/app/types/IRestaurant';
import withAuth from '@/app/hoc/withAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/app/styles/Home.module.scss';
import Distance from '@/app/utils/Distance';

function Restaurants({ restaurants }: any) {
    // search restaurant state
    const [search, setSearch] = useState<string>('');

    // restaurant state
    const [rests, setRests] = useState<IRestaurant[]>(restaurants.results);
    const [popularRests, setPopularRests] = useState<IRestaurant[]>(
        rests.sort((a: IRestaurant, b: IRestaurant) => a.rate - b.rate),
    );
    const [newRests, setNewRests] = useState<IRestaurant[]>(rests.reverse());
    const [nearestRests, setNearestRests] = useState<IRestaurant[]>([]);

    // get query from url
    const router = useRouter();
    const { filter } = router.query;

    // search restaurant function
    const searchRestaurant = (e: any) => {
        const filteredRestaurants = restaurants.results.filter(
            (rest: IRestaurant) =>
                rest.name.toLowerCase().includes(search.toLowerCase()),
        );
        setRests(filteredRestaurants);
    };

    // find nearest restaurant
    const findNearest = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const sortedRestaurants = rests
                    .map((restaurant: any) => {
                        const {
                            latitude: restaurantLat,
                            longitude: restaurantLng,
                        } = Distance.extractCoordinatesFromMapLink(
                            restaurant.mapLink,
                        );
                        const distance = Distance.distanceCalculate(
                            latitude,
                            longitude,
                            restaurantLat,
                            restaurantLng,
                        );
                        return { ...restaurant, distance };
                    })
                    .sort((a, b) => a.distance - b.distance);
                setNearestRests(sortedRestaurants);
            });
        }
    };

    // search filter when filter loaded
    useEffect(() => {
        switch (filter) {
            case 'Populyar olanlar':
                setRests(popularRests);
                break;
            case 'Yeni əlavə olunanlar':
                setRests(newRests);
                break;
            case 'Yaxındakılar':
                setRests(nearestRests);
                break;
            default:
                router.push('/');
                break;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    useEffect(() => {
        findNearest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>ResooTime</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    name="description"
                    content="ResooTime - bütün restoranlar burada. Sevimli restoranlarınızı onlayn rezerv edin və bonus qazanın."
                />
                <meta
                    name="keywords"
                    content="rezerv, restoranlar, bakıda restoranlar, kiraye restoranlar,en meşhur restoranlar, en meşhur 10 restoran, meşhur restoranlar, restoranlar bakida, restoranlarin qiymetleri,
                    rezervasiya sistemi, onlayn rezervasiya sistemi, restoran sifariş sistemi, stol sifarişi platforması, interaktiv stol xəritəsi, Azərbaycan restoranı rezervasiyası, restoran stolu mövcudluğu, istifadəçi dostu sifariş sistemi, Azərbaycan restoranı sifariş saytı, real vaxt stol seçimi, Azərbaycan restoran idarəetmə proqramı"
                />
                <meta name="og:title" content="ResooTime" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta
                    property="og:image"
                    content="https://resootime.com/images/logo.png"
                />
                <meta
                    property="og:description"
                    content="ResooTime - bütün restoranlar burada. Sevimli restoranlarınızı onlayn rezerv edin və bonus qazanın."
                />
                <meta property="og:site_name" content="ResooTime" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <main className={``}>
                    <div
                        className={`d-flex justify-content-center ${styles.home_page}`}>
                        <div className={``}>
                            <div
                                className={`${styles.heading_container} ${styles.home_width}`}>
                                <div
                                    className={`col-12 col-xl-6 d-flex justify-content-center flex-column pb-4`}>
                                    <h1 className={`${styles.heading}`}>
                                        Masanı Rezerv et
                                    </h1>
                                    <div
                                        className={`input-group ${styles.heading_input}`}>
                                        <input
                                            placeholder="Restoran, Kafe"
                                            type="text"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="form-control"
                                        />
                                        <Link
                                            href={{
                                                pathname: '/',
                                                query: { name: search },
                                            }}
                                            className={`btn btn-primary position-relative ${styles.input_btn}`}>
                                            Axtar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div
                            className={`pb-5 ${
                                styles.card_section + ' ' + styles.padding_less
                            } `}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className={`${styles.filters}`}>
                                    {filter}
                                </h3>
                            </div>
                            <div className="row">
                                {rests.map((rest: IRestaurant, i: number) => (
                                    <div
                                        key={i}
                                        className="col-6 my-2 col-md-4 col-xl-3">
                                        <Card cardInfo={rest} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}

export default withAuth(Restaurants, false);

// SSR
export async function getServerSideProps(context: any) {
    const { page } = context.query;
    const restaurants = await RestaurantService.getRestaurants(page);
    // let wildcard = context.req.headers.host.split('.')[0];

    // if (wildcard !== 'localhost:3000') {
    //     return {
    //         redirect: {
    //             destination: `http://localhost:3000/`,
    //             permanent: false,
    //         },
    //     };
    // }

    return {
        props: {
            restaurants,
        },
    };
}
