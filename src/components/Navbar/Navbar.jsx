import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiCellSignalFull, PiCellSignalX } from "react-icons/pi";
import {
  FaBars,
  FaBatteryEmpty,
  FaBatteryFull,
  FaBatteryQuarter,
  FaBatteryHalf,
  FaBatteryThreeQuarters,
  FaBoltLightning,
  FaClock,
  FaStopwatch,
  FaStopwatch20,
} from "react-icons/fa6";

import { FaTimes } from "react-icons/fa";
import { HHMMSS ,stopwatch} from "../../utils/formats/formats";
function formatStopWatch({d,hh,mm,ss}){
  let str = ''
  if(d>0){
    str += `${d}d`
  }
  if(d>0||hh>0){
    str += `${hh}:`
  }
  if(d>0|| hh>0||mm>0){
    str += `${mm}:`
  }
  if(d>0||hh>0||mm>0||ss>0){
    str += `${ss}`
  }
  return str
}
function Navbar({ onClick, isActive, secsLeft ,onEsc}) {
  const [time, setTime] = useState(Date.now());
  const [online, setOnline] = useState(null);
  const [battery, setBattery] = useState(null);
  useEffect(() => {
    const update = () => {
      setTime(Date.now());
      console.log("time changing");
    };
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!"getBattery" in navigator) return;
    const update = (target) => {
      setBattery(target);
    };
    navigator.getBattery().then((__battery) => {
      update(__battery);
      const lambda = (event) => update(event.target);
      __battery.onchargingchange = lambda;
      __battery.ondischargingchange = lambda;
      __battery.onlevelchange = lambda;
    });
    return () => {
      navigator.getBattery().then((__battery) => {
        __battery.onchargingchange = null;
        __battery.ondischargingchange = null;
        __battery.onlevelchange = null;
      });
    };
  });
  useEffect(() => {
    const update = () => {
      setOnline(navigator.onLine);
    };
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  useEffect(() => {
    const onKeydown = (e) => {
      if (e.key === "Escape") { 
        onEsc();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    }
  })
  
  return (
    <nav className="flex flex-wrap justify-between w-full p-5 text-2xl bg-gray-800 navbar">
      <div className="flex-wrap navbar-links d-center">
        <button onClick={onClick} className="w-16 unbtn d-center" accessKey="M">
          {!isActive ? <FaBars size={37} /> : <FaTimes size={37} />}
        </button>
        <span className="underline">M</span>
      </div>
      <div className="gap-3 status-bar d-center me-5">
        <div className="gap-1 px-3 py-2 text-sm rounded-full clock-time d-center bg-slate-600">
          <FaClock />
          <span className="d-center">{HHMMSS(time)}</span>
        </div>
        {secsLeft && (
          <div className="gap-1 px-3 py-2 text-sm rounded-full time-remaining d-center bg-slate-600">
            <FaStopwatch />
            <span className="d-center">{formatStopWatch(stopwatch(secsLeft))}</span>
          </div>
        )}
        <div className="p-1 rounded-md internet d-center bg-slate-600">
          {online ? <PiCellSignalFull /> : <PiCellSignalX />}
        </div>
        {battery != null && !(battery.level === 1 && battery.charging) && (
          <div className="gap-1 px-2 py-1 text-sm rounded-lg battery d-center bg-slate-700">
            <div className="ico d-center">
              {
                [
                  <FaBatteryEmpty />,
                  <FaBatteryQuarter />,
                  <FaBatteryHalf />,
                  <FaBatteryThreeQuarters />,
                  <FaBatteryFull />,
                ][Math.floor(battery.level * 4)]
              }
            </div>
            {battery.level * 100}%{battery.charging && <FaBoltLightning />}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
