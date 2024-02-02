import React from "react";
import "./Panels.css";
import { AdminLogin } from "./Panels/adminLogin";
import { AdminCommon } from "./Panels/adminCommon";
import { AdminStation } from "./Panels/adminStation";
import { AdminRoute } from "./Panels/adminRoute";
import { DefineService } from "./Panels/DefineService";
import { UserPanel } from "./Panels/UserPanel";
import { AdminPanel } from "./Panels/AdminPanel";

export enum IPanels {
  AdminLogin = "admin",
  AdminCommon = "adminCommon",
  AdminStation = "adminStation",
  AdminRoute = "adminRoute",
  DefineService = "defineService",
  UserPanel = "userPanel",
  AdminPanel = "adminPanel",
}

const PanelWrapper = (props: any) => {

  return <React.Fragment>
    <div className="panelWrapper">
      <div className="panelContainer">{props.children}</div>
    </div>
  </React.Fragment>
}

export const RenderPanel = (props: any) => {
  return <PanelWrapper>
    <RenderPanelInner {...props} />
  </PanelWrapper>
}

const RenderPanelInner = (props: any) => {
  const type = getPageType();
  switch (type) {
    case IPanels.AdminLogin: return <AdminLogin {...props} />
    case IPanels.AdminCommon: return <AdminCommon {...props} />
    case IPanels.AdminStation: return <AdminStation {...props} />
    case IPanels.AdminRoute: return <AdminRoute {...props} />
    case IPanels.DefineService: return <DefineService {...props} />
    case IPanels.UserPanel: return <UserPanel {...props} />
    case IPanels.AdminPanel: return <AdminPanel {...props} />
    default: break;
  }
  return <UserPanel {...props}/>
}

export function RedirectUrl(path: IPanels) {
  window.sessionStorage.setItem("redirect", path === "admin" ? "" : path);
  window.location.href = window.location.origin + (path === "admin" ? "?admin" : "");
}

function getPageType(): IPanels {
  // return IPanels.UserPanel;
  if (window.location.href.includes(IPanels.AdminLogin)) {
    return IPanels.AdminLogin;
  }
  return window.sessionStorage.getItem("redirect") as any;
}

export function endSession() {
  RedirectUrl(IPanels.AdminLogin);
}

export function mainMenu() {
  RedirectUrl(IPanels.AdminCommon);
}