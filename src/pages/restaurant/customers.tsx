import RestaurantService from "@/app/api/services/restaurantService";
import AdminModal from "@/app/components/reservation/adminModal";
import InlineMenu from "@/app/components/reservation/inlineMenu";
import MyCustomers from "@/app/components/reservation/myCustomers";
import ReservationNav from "@/app/components/reservation/reservationNav";
import withClient from "@/app/hoc/withClient";
import { selectIsModelOpen } from "@/app/redux/commonSlice";
import Cookie from "@/app/utils/Cookie";
import React from "react";
import { useSelector } from "react-redux";

const Customers = ({ reserv,restName }: any) => {
  const isModalOpen = useSelector(selectIsModelOpen);
  return (
    <>
      {isModalOpen ? <div className="overlay"></div> : null}
      <main style={{ backgroundColor: "#212841", height: "100vh" }}>
        <ReservationNav name={restName} />
        <AdminModal />
        <div className="d-flex">
          <InlineMenu />
          <MyCustomers reserv={reserv} />
        </div>
      </main>
    </>
  );
};

export default withClient(Customers);

// SSR
export async function getServerSideProps(context: any) {
  const { req,query } = context;
  let { date } = query;
  const token = Cookie.getFromSSR(req, "token");
  const rest = await RestaurantService.getRestaurant(token);
  const reserv = await RestaurantService.getReservationByDate(rest.id,date);
  return {
    props: {
      restName: rest.name,
      reserv,
    },
  };
}
