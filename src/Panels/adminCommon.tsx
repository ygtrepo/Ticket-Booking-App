import React from "react";
import "./adminCommon.css";
import { IPanels, RedirectUrl } from "../Panels";

export const AdminCommon = () => {

  function endSession() {
    RedirectUrl(IPanels.AdminLogin);
  }

  function station_click() {
    RedirectUrl(IPanels.AdminStation);
  }

  function route_click() {
    RedirectUrl(IPanels.AdminRoute);
  }

  function define_service_click() {
    RedirectUrl(IPanels.DefineService);
  }

  function admin_panel_click() {
    RedirectUrl(IPanels.AdminPanel);
  }

  return <React.Fragment>
    <div className="AdminCommonPanel">
      <div className="menuItemWrapper">
        <i className="fa-solid fa-right-from-bracket" title="exit" onClick={endSession}></i>
      </div>
      <br />
      <input type="button" className="actionOption" value="Define Station" onClick={station_click} />
      <br />
      <input type="button" className="actionOption" value="Define Route" onClick={route_click} />
      <br />
      <input type="button" className="actionOption" value="Define Service" onClick={define_service_click} />
      <br />
      <input type="button" className="actionOption" value="Admin Panel" onClick={admin_panel_click} />
      <br />
    </div>
  </React.Fragment>
}