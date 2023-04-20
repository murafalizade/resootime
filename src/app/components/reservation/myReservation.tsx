import RestaurantService from "@/app/api/services/restaurantService";
import baseUrl from "@/app/constants/baseUrl";
import Image from "next/image";
import React from "react";
import withErrorHandeler from "@/app/hof/withErrorHandler";

const MyReservation = ({ reserv }: any) => {
  const cancelReservation = async (id: number) => {
    await withErrorHandeler(
      async (args: any) => {
        await RestaurantService.cancelReservation(args);
      },
      "Reservasiya uğurla ləğv edildi!",
      "/", 
    )(id);
  };

  return (
    <div
      style={{ maxHeight: "500px" }}
      className=" mx-5 bg-light p-3 overflow-scroll rounded-3"
    >
      <table className="table table-hover">
        <thead className="text-center">
          <tr className="text-muted muted">
            <th style={{ textAlign: "left" }} scope="col">
              Restoran
            </th>
            <th scope="col">Tarix</th>
            <th scope="col">Ziyarətçi sayı</th>
            <th scope="col">Rezervasiya edən</th>
            <th scope="col">Masa</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
          {reserv?.map((res: any) => (
            <tr key={res.id}>
              <th scope="row">
                <div className="d-flex">
                  <Image
                    src={
                      res.restaurant_id?.images[0]?.image
                        ? baseUrl + res.restaurant_id.images[0]?.image
                        : "/images/rest_imag.png"
                    }
                    className="rounded-3"
                    alt="image"
                    width={50}
                    height={50}
                  />
                  <div className="mx-3 ">
                    <h6 className="m-0">{res.restaurant_id?.name}</h6>
                    <p className="text-muted m-0">
                      {res.restaurant_id?.location}
                    </p>
                  </div>
                </div>
              </th>
              <td>{res.date}</td>
              <td>{res.table_id.count}</td>
              <td>{res.user_id
                  ? `${res.user_id.first_name} ${res.user_id.last_name}`
                  : `${res.first_name} ${res.last_name}`}</td>
              <td>{res.table_id.name}</td>
              <td>
                <button
                  onClick={() => cancelReservation(res.id)}
                  className="btn btn-outline-primary"
                >
                  Ləğv et
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReservation;
