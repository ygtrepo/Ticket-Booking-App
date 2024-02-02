import React, { useRef, useState } from "react";
import { endSession, mainMenu } from "../Panels";
import "./adminStation.css";

export const AdminStation = () => {

  const station = useRef<HTMLInputElement>(null);

  const [stations, setStations] = useState<string[]>(["Station1", "Station2", "Station3"]);

  function addStation() {
    if (station.current!.value === "") return;
    if (!stations.includes(station.current!.value)) {
      setStations([...stations, station.current!.value]);
    }
    station.current!.value = "";
    station.current!.focus();
  }

  function deleteStation(st: string) {
    setStations(stations.filter(station => station !== st))
  }

  return <React.Fragment>
    <div className="AdminStationPanel" style={{ width: "200px" }}>
      <div className="menuItemWrapper">
        <i className="fa-solid fa-right-from-bracket" title="exit" onClick={endSession}></i>
        <i className="fa-solid fa-bars" title="go to main menu" onClick={mainMenu}></i>
      </div>
      <div className="welcometext">Enter Station</div>
      <input type="text" placeholder="Station" ref={station} />
      <i className="fa-solid fa-plus" onClick={addStation} />
      <div className="welcometext" style={{ fontWeight: "bold", marginTop: "5px" }}>Stations</div>
      <div className="stationList" style={{ border: "1px solid #ccc", maxHeight: "300px", overflow: "auto" }}>
        {stations.map(s => {
          return <div key={s} style={{ position: "relative" }}>
            <span className="station-text">{s}</span>
            <i className="fa-solid fa-xmark deleteicon" onClick={() => deleteStation(s)} />
          </div>
        })}
      </div>
      <br />
      <input type="button" value="TODO" />
    </div>
  </React.Fragment>
}
