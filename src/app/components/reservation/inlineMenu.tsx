import Cookie from "@/app/utils/Cookie";
import Router  from "next/dist/client/router";
import React from "react";
import { BiMenuAltRight } from "react-icons/bi";
import {  CiLogout, CiSettings, CiViewList, CiViewTable } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

const InlineMenu = () => {

  const logout = () => {
    Cookie.delete("token");
    Router.push("/");
  };

  return (
    <div style={{ width: "60px",backgroundColor:"#212841" }} className="d-flex flex-column justify-content-between">
      <div>
        <a href="/restaurant/reservations" title="Reservations" className="text-decoration-none">
          <div className="d-flex justify-content-center my-4">
            <CiViewTable size={"2em"} color="white" />
          </div>
        </a>
        <a href="/restaurant/customers" title="Customer" className="text-decoration-none">
          <div className="d-flex justify-content-center my-4">
            <CiViewList size={"2em"} color="white" />
          </div>
        </a>
        <a href="/restaurant/create-map" title="Create Map" className="text-decoration-none">
          <div className="d-flex justify-content-center my-4">
            <IoCreateOutline size={"2em"}  color="white"/>
          </div>
        </a>
        <a href="/restaurant/settings" title="Settings" className="text-decoration-none">
          <div className="d-flex justify-content-center my-4">
            <CiSettings size={"2em"} color="white" />
          </div>
        </a>
        <a role="button" onClick={logout} title="Log out" className="text-decoration-none">
          <div className="d-flex justify-content-center my-4">
            <CiLogout size={"2em"} color="white" />
          </div>
        </a>
      </div>
      <div>
        <a  className="text-decoration-none">
          <div className="d-flex justify-content-center my-3">
            <BiMenuAltRight size={"2em"} color="#374167" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default InlineMenu;
