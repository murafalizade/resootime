import RestaurantService from "@/app/api/services/restaurantService";
import { Loading } from "@/app/components/layout/loading";
import InlineMenu from "@/app/components/reservation/inlineMenu";
import withClient from "@/app/hoc/withClient";
import { setTables } from "@/app/redux/commonSlice";
import Cookie from "@/app/utils/Cookie";
import dynamic from "next/dynamic";
// import CreateMapTool from "@/app/components/restaurant/createMapTool";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateMapTool = dynamic(
  () => import("@/app/components/restaurant/createMapTool"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
); 

const CreateMap = ({ restId, tbls,wall }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTables(tbls));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex">
      <InlineMenu />
      <CreateMapTool restId={restId}  wall={wall}/>
    </div>
  );
};

export default withClient(CreateMap);

export async function getServerSideProps(context: any) {
  const { req } = context;
  const token = Cookie.getFromSSR(req, "token");
  const rest = await RestaurantService.getRestaurant(token);
  const map = await RestaurantService.getTables(rest.id);
  return {
    props: {
      restId: rest.id,
      tbls: map?.table || [],
      wall: map?.wall || "",
    },
  };
}
