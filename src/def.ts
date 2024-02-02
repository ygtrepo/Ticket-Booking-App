export const Routes = [
  { code: "R0001", lines: ["London", "Oxford", "Birmingham", "Manchester", "Liverpool"] },
  { code: "R0002", lines: ["London", "Liverpool"] },
  { code: "R0003", lines: ["London", "Leeds", "Edinburgh"] },
  { code: "R0004", lines: ["Edinburgh", "Glasgow", "Manchester", "Liverpool"] },
];

export const Services = [
  { code: "S0001", route: "R0001", seat: 40, freq: "D" },
  { code: "S0002", route: "R0002", seat: 40, freq: "D" },
  { code: "S0003", route: "R0003", seat: 40, freq: "D" },
  { code: "S0004", route: "R0004", seat: 40, freq: "D" },
  { code: "S0005", route: "R0001", seat: 10, freq: "H" },
  { code: "S0006", route: "R0002", seat: 10, freq: "H" },
  { code: "S0007", route: "R0003", seat: 10, freq: "H" },
  { code: "S0008", route: "R0004", seat: 10, freq: "H" },
  { code: "S0009", route: "R0004", seat: 50, freq: "S" },
];

export interface ITicket {
  id: number;
  service: string;
  seat: number;
  departure: string;
  landing: string;
  email: string;
}

const HOSTURL = "http://localhost:8085?"; //make this host ip for all devices can connection to nodejs

type ITicketParams = Omit<ITicket, "id">

export function api_sell_and_update_tickets(par: ITicketParams): Promise<ITicket[]> {
  const params = new URLSearchParams({
    process: "3",
    service: par.service,
    seat: par.seat.toString(),
    departure: par.departure,
    landing: par.landing,
    email: par.email,
  });
  return fetch(HOSTURL + params.toString(), {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then((result) => result.json());
}

export function All_Routes() {
  return Routes;
}

export function Route(routeCode: string) {
  return Routes.filter(route => route.code === routeCode)
}

export function BusServices_forARoute(routeCode: string) {
  return Services.filter(bus_service => bus_service.route === routeCode);
}

export function BusService(code: string) {
  return Services.filter(bus_service => bus_service.code === code)[0];
}

export function route_and_service_from_service_code(code: string) {
  const currentRoute = Services.filter(s => s.code === code);
  const routeInfo = Routes.filter(r => r.code === currentRoute[0].route);
  return { route: routeInfo[0].lines, service: currentRoute[0] }
}

interface IRoute {
  code: string;
  id: number;
}

interface IService {
  code: string;
  route: string;
  seat: number;
  id: number;
}

interface IRouteStations {
  routecode: string;
  stationname: string;
  stationorder: number;
  id: number;
}

interface IAllInfo {
  routes: IRoute[]
  services: IService[]
  stations: IRouteStations[]
}

export function api_route_services(): Promise<IAllInfo> {
  const params = new URLSearchParams({ process: "1", });
  return fetch(HOSTURL + params.toString(), {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then((result) => result.json());
}

export function api_sold_tickets(servicecode: string): Promise<ITicket[]> {
  const params = new URLSearchParams({ process: "2", code: servicecode });
  return fetch(HOSTURL + params.toString(), {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then((result) => result.json());
}