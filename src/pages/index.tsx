import Head from 'next/head';
import Layout from '@/app/components/layout/layout';
import Card from '@/app/components/card/card';
import RestaurantService from '@/app/api/services/restaurantService';
import { IRestaurant } from '@/app/types/IRestaurant';
import withAuth from '@/app/hoc/withAuth';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/app/styles/Home.module.scss';

function Home({ restaurants }: any) {
    // search restaurant state
    const [search, setSearch] = useState<string>('');

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
                <meta name="keywords" content="rezervasiya sistemi, stol seçimi xəritəsindən, onlayn rezervasiya sistemi, restoran sifariş sistemi, stol sifarişi platforması, interaktiv stol xəritəsi, Azərbaycan restoranı rezervasiyası, veb üzərindəki sifariş proqramı, restoran stolu mövcudluğu, istifadəçi dostu sifariş sistemi, Azərbaycan restoranı sifariş saytı, real vaxt stol seçimi, Azərbaycan restoran idarəetmə proqramı" />
                <meta name='og:title' content='ResooTime' />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://resootime.com/" />
                <meta property="og:image" content="https://resootime.com/images/logo.png" />
                <meta property="og:description" content="ResooTime - bütün restoranlar burada. Sevimli restoranlarınızı onlayn rezerv edin və bonus qazanın." />
                <meta property="og:site_name" content="ResooTime" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <main>
                    <div className={`container-fluid ${styles.home_page}`}>
                        <div className={`${styles.heading_container} mx-md-5 `}>
                            <div className="col-12 col-xl-6 mx-md-5 my-5 py-5 d-flex d-md-block justify-content-center align-items-center flex-column">
                                <h1
                                    className={`mb-5 mx-sm-3 ${styles.heading}`}>
                                    Masa Rezerv et
                                </h1>
                                <div
                                    className={`input-group ${styles.heading_input}`}>
                                    <Image
                                        src="/icons/search-bar.svg"
                                        alt="axtaris ikonu"
                                        width={17}
                                        height={17}
                                        className={`position-relative ${styles.search_btn}`}
                                    />
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
                    <div
                        className={`container mt-5 px-4 ${styles.card_section}`}>
                        <div className="row">
                            {rests.map((rest: IRestaurant, i: number) => (
                                <div
                                    key={i}
                                    className="col-6 col-md-4 col-xl-3 my-3">
                                    <Card cardInfo={rest} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <nav
                        className="d-flex justify-content-center mt-3"
                        aria-label="Page navigation example">
                        <ul className="pagination mb-5">
                            <li
                                className={`page-item ${
                                    !page || page == '1' ? 'disabled' : ''
                                }`}>
                                <Link
                                    className={`page-link ${styles.common_page_link}`}
                                    href={{ pathname: '', query: { page: 1 } }}>
                                    Geri
                                </Link>
                            </li>
                            {
                                // pagination
                                Array.from(
                                    { length: restaurants.count / 20 + 1 },
                                    (_, i) => i + 1,
                                ).map((page: number) => (
                                    <li
                                        key={page}
                                        className={`page-item ${
                                            page == 1
                                                ? `active ${styles.active}`
                                                : ''
                                        }`}>
                                        <Link
                                            className={`page-link ${styles.active_page_link}`}
                                            href={{
                                                pathname: '',
                                                query: { page },
                                            }}>
                                            {page}
                                        </Link>
                                    </li>
                                ))
                            }
                            {restaurants.count / 20 + 1 > 2 ? (
                                <li className="page-item">
                                    <Link
                                        className="page-link"
                                        href={{
                                            pathname: '',
                                            query: { page: 4 },
                                        }}>
                                        Irəli
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                    </nav>
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
    return {
        props: {
            restaurants,
        },
    };
}
