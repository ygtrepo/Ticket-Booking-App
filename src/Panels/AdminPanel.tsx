import React, { forwardRef, useRef, useState } from "react";
import "./userpanel.css";
import { Bus, IBusHandles } from "../Components/Bus";
import { All_Routes, BusServices_forARoute, } from "../def";
import { endSession, mainMenu } from "../Panels";

interface IAdminPanelProps { }

interface IAdminPanelHandles { }

interface IAdminPanelState {
  selectedRoute: string;
  routes: { code: string, lines: string[] }[]
  busServices: { code: string, route: string, seat: number }[]
}


const AdminPanelComponent: React.ForwardRefRenderFunction<IAdminPanelHandles, IAdminPanelProps> = (props, ref) => {

  const bus = useRef<IBusHandles>(null);

  const [state, setState] = useState<IAdminPanelState>({ selectedRoute: "", routes: All_Routes(), busServices: [] });

  const route = useRef<HTMLSelectElement>(null);
  const buses = useRef<HTMLSelectElement>(null);

  function routeChanged() {
    if (bus.current) bus.current.clear();
    if (buses.current) buses.current.value = "";
    setState({ ...state, selectedRoute: route.current!.value, busServices: BusServices_forARoute(route.current!.value) });
  }

  function loadBus() {
    bus.current!.clear();
    if (buses.current!.value === "") return;
    bus.current!.loadService(buses.current!.value, "", "");
  }

  return <div className='ticketContainer'>
    <div className="menuItemWrapper">
      <i className="fa-solid fa-right-from-bracket" title="exit" onClick={endSession}></i>
      <i className="fa-solid fa-bars" title="go to main menu" onClick={mainMenu}></i>
    </div>
    <div className='ticketselect'>
      <select className="route" ref={route} onChange={routeChanged}>
        <option value={""}>Route</option>
        {state.routes.map((r, index) => {
          return <option key={`${r.code}-${index}`} value={r.code}>{r.lines.join("-")}</option>
        })}
      </select>
      <div />
      {(route.current && route.current!.value !== "") &&
        <select ref={buses} onChange={loadBus}>
          <option value="">Buses</option>
          {state.busServices.map(busService => {
            return <option key={busService.code} value={busService.code}>Seat:{busService.seat}</option>
          })}
        </select>
      }
      <br />
    </div>
    <Bus ref={bus} admin={true} />
  </div>
}

export const AdminPanel = forwardRef(AdminPanelComponent);

