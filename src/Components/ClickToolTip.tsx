import React from "react";
import "./tooltip.css";
import { ITicket, } from "../def";

export const ClickToolTip: React.FunctionComponent<{ tickets: ITicket[], children: any }> = (props) => {

  const showText = props.tickets.length === 0 ? "" : props.tickets.length;

  function openToolTip(event: React.MouseEvent<HTMLDivElement>) {
    if (showText === "") return;
    console.log(props.tickets);
    const el = document.createElement("div");
    el.setAttribute("class", "ToolTipBody");
    let tooltipText = "";
    for (let i = 0; i < props.tickets.length; i++) {
      tooltipText = `${tooltipText}${props.tickets[i].departure}-${props.tickets[i].landing} : ${props.tickets[i].email}<br/>`;
    }
    el.innerHTML = tooltipText;
    el.style.left = event.pageX - 20 + "px";
    el.style.top = event.pageY - 20 + "px";
    document.body.appendChild(el);

    function closeToolTip(e: MouseEvent) {
      if (e.target === el) return;
      el.remove();
      document.body.removeEventListener("click", closeToolTip, true);
    }

    document.body.addEventListener("click", closeToolTip, true);
  }

  return <React.Fragment>
    <div className={`ClickToolTip ${showText === "" ? "" : "sold"}`} onClick={openToolTip}>
      <div className='ShowCount'>{showText}</div>
      {props.children}
    </div>
  </React.Fragment>
}