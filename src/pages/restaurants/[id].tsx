import DateFinder from "@/app/components/reservation/dateFinder";
import Table from "@/app/components/restaurant/table";
import {
  filterTables,
  makeLoading,
  selectFilteredTables,
  selectIsLoading,
  selectIsModelOpen,
} from "@/app/redux/commonSlice";
import Image from "next/dist/client/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLocationSharp } from "react-icons/io5";
import StarsRating from "react-star-rate";
import Layout from "@/app/components/layout/layout";
import RestaurantService from "@/app/api/services/restaurantService";
import baseUrl from "@/app/constants/baseUrl";
import withAuth from "@/app/hoc/withAuth";
import { Loading } from "@/app/components/layout/loading";
import Head from "next/head";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RestInfo from "@/app/components/reservation/restInfo";
import styles from "@/app/styles/CreateMapTool.module.scss";
import { BiRestaurant } from "react-icons/bi";
import { GetServerSideProps } from "next";
import { formatDate } from "@/app/constants/date";
 
const ReservationRestaurant = ({ res }: any) => {
  const isModalOpen = useSelector(selectIsModelOpen);
  const dispatch = useDispatch();
  const resTable = useSelector(selectFilteredTables);
  const isLoading = useSelector(selectIsLoading);
  const [wall, setWall] = useState("");
  const [date, setDate] = useState(new Date());

  const getTables = async () => {
    const map = await RestaurantService.getTables(res.id);
    setWall(map?.wall);
    const filterTable = await RestaurantService.getAvailableTables(
      res.id,
      date.toLocaleDateString(formatDate.locale),
      1
    );
    dispatch(filterTables(filterTable));
  };

  useEffect(() => {
    dispatch(makeLoading());
    getTables();
    dispatch(makeLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>ResooTime</title>
        <meta name="description" content={res.description} />
        <meta name="keywords" content={`restaran rezervasiya masa ${res.name} ${res.category?.name}`} />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <Layout>
        <main>
          {isModalOpen ? <div className="overlay"></div> : null}
          <div className="container fluid mt-5 pb-5 px-4">
            <div className="row">
              <div className="col-12 col-md-6">
                <h1 className="fw-bold">{res.name}</h1>
                <p style={{color: '#505050'}}>
                  <IoLocationSharp className="me-1" style={{color: '#505050', fontSize: '25px'}} />
                  {res.location}
                </p>
                <hr />
                <p style={{color: '#505050'}}>{res.description}</p>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column">
                  <Image
                    src={
                      res.images[0]?.image
                        ? baseUrl + res.images[0]?.image :
                        "/images/rest_imag.png"
                    }
                    alt={res.name}
                    width={400}
                    objectFit="contain"
                    height={400}
                    className="img-fluid rounded"
                  />
                  <div>
                    {res.images.slice(1)?.map((image: any) => (
                      <Image
                        key={image.id}
                        src={baseUrl + image?.image}
                        alt={res.name}
                        width={100}
                        height={100}
                        className="mx-3 img-fluid rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container fluid px-md-0 px-4">
            <div className="row d-flex flex-md-row md-reverse">
              <div className="col-12 col-md-8 pt-1">
                <h3 className="fw-bold">Masanızı Seçin</h3>
                <div
                  className="position-relative border bg-dark mb-4"
                  style={{ height: "600px", borderRadius: "15px" }}
                >
                  <div style={{ zIndex: 2 }} className="text-light p-3">
                    <div className="d-flex my-2 align-items-center">
                      <div
                        style={{ width: "25px", height: "25px" }}
                        className="rounded-circle me-1 bg-success"
                      ></div>{" "}
                      <span> - Boş Masalar </span>
                      <br />
                    </div>
                  </div>
                  {isLoading ? <Loading /> : null}
                  <TransformWrapper
                    initialScale={0.75}
                    minScale={0.5}
                    maxScale={2}
                    limitToBounds={false}
                  >
                    <TransformComponent
                      wrapperStyle={{
                        height: "520px",
                        width: "98.5%",
                        marginLeft: "5px",
                      }}
                    >
                      {wall ? (
                        <Image
                          className={`position-relative ${styles.image}`}
                          src={wall}
                          alt={res.name}
                          fill
                          objectFit="contain"
                        />
                      ) : null}
                      {resTable?.map((table: any, index: number) => (
                        <Table key={index} table={table} />
                      ))}
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              </div>
              <div className="my-5 col-12 col-md-4">
                <DateFinder
                  allowed = {res.allowed}
                  restId={res.id}
                  restImage={
                    res.images[0]?.image
                      ? baseUrl + res.images[0]?.image
                      : 
                      "/images/rest_imag.png"
                  }
                  restName={res.name}
                />
                <div className="d-none d-md-flex">
                  <RestInfo
                    phone={res.phone}
                    location={res.location}
                    workingTime={res.working_hours}
                    googleMapLink={res.googleMapLink}
                  />
                </div>
              </div>
            </div>
            <div className="d-md-none d-flex">
              <RestInfo
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id  = params?.id;
  const res = await RestaurantService.getRestaurant(parseInt(id as string));
  return { props: { res } };
}
