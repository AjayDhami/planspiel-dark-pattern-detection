import React from "react";
import { Outlet } from "react-router-dom";

const ClientDashboardLayout = () => {
  return (
    <div>
      <h2>ClientDashboardLayout</h2>
      <Outlet />
    </div>
  );
};

export default ClientDashboardLayout;
