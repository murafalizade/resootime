import Router from "next/router";
import React, { ComponentType, useEffect } from "react";
import Cookie from "../utils/Cookie";

const withAuth = (WrappedComponent: ComponentType) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuth = (props: any) => {
    useEffect(() => {
      const token = Cookie.get("token");
      if (!token) {
        Router.push("/login");
      } 
    }, []);

    return <WrappedComponent {...props} />;
  };
  ComponentWithAuth.displayName = `withAuth(${displayName})`;
  return ComponentWithAuth;
};

export default withAuth;
