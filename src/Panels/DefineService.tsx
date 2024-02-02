import React from "react";
import { endSession, mainMenu } from "../Panels";

export const DefineService = () => {

  return <React.Fragment>
    <div className="AdminStationPanel" style={{ width: "200px" }}>
      <div className="menuItemWrapper">
        <i className="fa-solid fa-right-from-bracket" title="exit" onClick={endSession}></i>
        <i className="fa-solid fa-bars" title="go to main menu" onClick={mainMenu}></i>
      </div>
      <div>Enter Service Information</div>
      <div>route and seat</div>
      <div>TODO...</div>
    </div>
  </React.Fragment>
}