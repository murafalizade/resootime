import Head from 'next/head';
import Layout from '@/app/components/layout/layout';
import Card from '@/app/components/card/card';
import RestaurantService from '@/app/api/services/restaurantService';
import { IRestaurant } from '@/app/types/IRestaurant';
import withAuth from '@/app/hoc/withAuth';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/app/styles/Home.module.scss';
import Carousel from '@/app/components/card/carousel';

function Home({ restaurants }: any) {
    // search restaurant state
    const [search, setSearch] = useState<string>('');

    // filters
    const [isShowNewOnes, setIsShowNewOnes] = useState<boolean>(false);
    const [isShowPopularOnes, setIsShowPopularOnes] = useState<boolean>(false);
    const [isShowNearOnes, setIsShowNearOnes] = useState<boolean>(false);

    // restaurant state
    const [rests, setRests] = useState<IRestaurant[]>(restaurants.results);

    // get query from url
    const router = useRouter();
    const { name, page } = router.query;

    // search restaurant function
    const searchRestaurant = (e: any) => {
        const filteredRestaurants = restaurants.results.filter(
            (rest: IRestaurant) =>
                rest.name.toLowerCase().includes(search.toLowerCase()) ||
                rest.category?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()),
        );
        setRests(filteredRestaurants);
    };

    // search restaurant when page loaded
    useEffect(() => {
        searchRestaurant(name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

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
                    <div className={`${styles.home_page}`}>
                        <div className={`main-container`}>
                            <div
                                className={`container fluid ${styles.heading_container}`}>
                                <div className="col-12 col-xl-6 d-flex justify-content-center flex-column pb-4">
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
                                                pathname: '',
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
                    <div className={`pb-5 ${styles.card_section}`}>
                    {rests.length > 4 ? (
                            <div>
                                <div className="row mt-5">
                                    <Carousel title="Yeni əlavə olunanlar">
                                        {rests.map((rest, i: number) => (
                                            <Card key={i} cardInfo={rest} />
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className={`${styles.filters}`}>
                                       Yeni əlavə olunanlar
                                    </h3>
                                </div>
                                <div className="row">
                                    {rests.map(
                                        (rest: IRestaurant, i: number) => (
                                            <div
                                                key={i}
                                                className="col-6 col-md-4 col-xl-3">
                                                <Card cardInfo={rest} />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                        {rests.length > 4 ? (
                            <div>
                                <div className="row mt-5">
                                    <Carousel title="Populyar olanlar">
                                        {rests.map((rest, i: number) => (
                                            <Card key={i} cardInfo={rest} />
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className={`${styles.filters}`}>
                                        Populyar olanlar
                                    </h3>
                                </div>
                                <div className="row">
                                    {rests.map(
                                        (rest: IRestaurant, i: number) => (
                                            <div
                                                key={i}
                                                className="col-6 col-md-4 col-xl-3">
                                                <Card cardInfo={rest} />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                        {rests.length > 4 ? (
                            <div>
                                <div className="row mt-5">
                                    <Carousel title="Yaxındakılar">
                                        {rests.map((rest, i: number) => (
                                            <Card key={i} cardInfo={rest} />
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className={`${styles.filters}`}>
                                        Yaxındakılar
                                    </h3>
                                </div>
                                <div className="row">
                                    {rests.map(
                                        (rest: IRestaurant, i: number) => (
                                            <div
                                                key={i}
                                                className="col-6 col-md-4 col-xl-3">
                                                <Card cardInfo={rest} />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </Layout>
        </>
    );
}

export default withAuth(Home, false);

// SSR
export async function getServerSideProps(context: any) {
    const { page } = context.query;
    const restaurants = await RestaurantService.getRestaurants(page);
    let wildcard = context.req.headers.host.split('.')[0];

    if (wildcard !== 'localhost:3000') {
        return {
            redirect: {
                destination: `http://localhost:3000/`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            restaurants,
        },
    };
}
