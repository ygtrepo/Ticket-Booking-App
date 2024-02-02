import React, { useRef } from "react";
import "./adminLogin.css";
import { IPanels, RedirectUrl } from "../Panels";

export const AdminLogin = () => {

  const loginBtn = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  function loginClicked() {
    if (username.current!.value === "") return;
    if (password.current!.value === "") return;
    loginBtn.current!.disabled = true;
    setTimeout(() => {
      RedirectUrl(IPanels.AdminCommon);
      loginBtn.current!.disabled = false;
    }, 10);
  }

  return <React.Fragment>
    <div className="userlogin-panel">
      <div className="welcometext">Admin Panel</div>
      <input type="text" className="userlogin user-id" autoComplete="off" placeholder="username" ref={username} />
      <br />
      <input type="text" className="userlogin user-pw" autoComplete="off" placeholder="password" ref={password} />
      <br />
      <input ref={loginBtn} type="button" value="Login" className="user-login" onClick={loginClicked} />
    </div>
  </React.Fragment>
}
