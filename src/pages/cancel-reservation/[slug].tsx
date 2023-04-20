import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Router, { useRouter } from "next/router";
import RestaurantService from "@/app/api/services/restaurantService";
import withErrorHandeler from "@/app/hof/withErrorHandler";

const CancelReservation = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    Swal.fire({
      title: "Are you sure that cancel the reservation?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (slug && typeof slug === "string") {
          await withErrorHandeler(
            async (args: any) => {
              await RestaurantService.cancelReservation(args);
            },
            "/",
            "Reservasiya uğurla ləğv edildi!"
          )(slug);
        }
      } else {
        Router.push("/");
      }
    });
  }, [slug]);

  return <div></div>;
};

export default CancelReservation;
