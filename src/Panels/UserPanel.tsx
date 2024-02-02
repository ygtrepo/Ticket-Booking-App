import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./userpanel.css";
import { Bus, IBusHandles } from "../Components/Bus";
import { Services, Routes } from "../def";

interface IUserPanelProps { }

interface IUserPanelHandles { }

interface IUserPanelState {
  selectedRoute: string;
  routes: { code: string, lines: string[] }[]
  stations: string[]
  d: number,
  l: number,
  headways: { code: string, route: string, seat: number }[]
}


const UserPanelComponent: React.ForwardRefRenderFunction<IUserPanelHandles, IUserPanelProps> = (props, ref) => {

  // TODO cancel route selection and make departure autocomplate
  // if there is exist more than one ways for selection routes ask the customer for
  // with option do you want prefer. like A-B-C-D | A-D

  const bus = useRef<IBusHandles>(null);

  const [state, setState] = useState<IUserPanelState>({ selectedRoute: "", routes: [], stations: [], d: 0, l: 0, headways: [] });

  useEffect(() => {
    setState({ routes: Routes, selectedRoute: "", stations: [], d: 0, l: 0, headways: [] });
  }, [])

  const route = useRef<HTMLSelectElement>(null);
  const departure = useRef<HTMLSelectElement>(null);
  const landing = useRef<HTMLSelectElement>(null);
  const buses = useRef<HTMLSelectElement>(null);

  function routeChanged() {
    let stations: string[] = [];
    for (let i = 0; i < state.routes.length; i++) {
      if (state.routes[i].code === route.current!.value) {
        stations = state.routes[i].lines;
        break;
      }
    }
    if (bus.current) bus.current.clear();
    if (buses.current) buses.current.value = "";
    setState({ ...state, selectedRoute: route.current!.value, stations: stations, d: 1, l: stations.length - 1 });
  }

  function departureChanged() {
    const dIndex = state.stations.findIndex(station => station === departure.current!.value)
    setState({ ...state, d: dIndex === -1 ? 1 : (dIndex + 1) });
    bringSeats();
  }

  function landingChanged() {
    const lIndex = state.stations.findIndex(station => station === landing.current!.value)
    setState({ ...state, l: lIndex === -1 ? state.stations.length - 1 : lIndex });
    bringSeats();
  }

  function bringSeats() {
    const d = departure.current!.value;
    const l = landing.current!.value;
    if (d === "") return;
    if (l === "") return;
    if (bus.current) bus.current.clear();
    if (buses.current) buses.current.value = "";
    setState({ ...state, headways: Services.filter(service => service.route === route.current!.value) })
  }

  function loadBus() {
    bus.current!.clear();
    if (buses.current!.value === "") return;
    bus.current!.loadService(buses.current!.value, departure.current!.value, landing.current!.value);
  }

  return <div className='ticketContainer'>
    <div className='ticketselect'>
      <select className="route" ref={route} onChange={routeChanged}>
        <option value={""}>Route</option>
        {state.routes.map((r, index) => {
          return <option key={`${r.code}-${index}`} value={r.code}>{r.lines.join("-")}</option>
        })}
      </select>
      <br />
      <select className='departure' ref={departure} onChange={departureChanged}>
        <option value={""}>Departure</option>
        {state.stations.slice(0, state.l).map(station => {
          return <option key={station}>{station}</option>
        })}
      </select>
      <select className='landing' ref={landing} onChange={landingChanged}>
        <option value={""}>Landing</option>
        {state.stations.slice(state.d, state.stations.length).map(station => {
          return <option key={station}>{station}</option>
        })}
      </select>
      <br />
      {(route.current && route.current!.value !== "" &&
        departure.current && departure.current.value !== "" &&
        landing.current && landing.current.value !== "") &&
        <select ref={buses} onChange={loadBus}>
          <option value="">Buses</option>
          {state.headways.map(headway => {
            return <option key={headway.code} value={headway.code}>Seat:{headway.seat}</option>
          })}
        </select>
      }
      <br />
    </div>
    <Bus ref={bus} />
  </div>
}

export const UserPanel = forwardRef(UserPanelComponent);

