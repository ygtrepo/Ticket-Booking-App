import React from "react";
import "./seaticon.css";
import { ITicket } from "../def";
import { ClickToolTip } from "./ClickToolTip";

const availableColor = "#35bd35";
const unAvailableColor = "#919191";
export const selectedColor = "red";
const adminColor = "#90ee90";

export const SeatIcon = (props: { available: boolean, selected: boolean, onClick: (e: any) => void, }) => {
  const color = props.selected ? selectedColor : props.available ? availableColor : unAvailableColor;
  return <i
    className={`fas fa-couch fa-2x ${props.available ? "available" : "unavailable"}`}
    onClick={props.available ? props.onClick : undefined}
    style={{ color: color }}
  />

}

export const AdminSeatIcon = (props: { sold_tickets: ITicket[] }) => {

  return <ClickToolTip tickets={props.sold_tickets}>
    <i
      className={`fas fa-couch fa-2x adminseat`}
      style={{ color: props.sold_tickets.length === 0 ? availableColor : adminColor }}
    />
  </ClickToolTip>

}