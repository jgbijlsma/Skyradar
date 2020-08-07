import React from "react";
import { Marker, Popup } from "react-leaflet";

const PlaneMarker = ({ plane }) => {
  const [
    ,
    callsing,
    origin,
    ,
    ,
    lon,
    lat,
    baro,
    onGround,
    velocity,
    track,
    verticalRate,
    ,
    ,
    ,
    ,
    ,
  ] = plane;

  return (
    <Marker position={[lat, lon]}>
      <Popup>
        <ul>
          {callsing && callsing.length > 0 && (
            <li>
              <b>Callsign: </b>
              {callsing}
            </li>
          )}
          {origin && (
            <li>
              <b>Origin: </b>
              {origin}
            </li>
          )}
          {baro && (
            <li>
              <b>Altitude: </b>
              {Math.round(baro)} m
            </li>
          )}
          {velocity && (
            <li>
              <b>Velocity: </b>
              {Math.round(velocity * 3.6)} k/h
              <br />
              {Math.round(velocity * 1.944)} knots
            </li>
          )}
          {track && (
            <li>
              <b>Heading: </b>
              {Math.round(track)}°
            </li>
          )}
          <li>
            <b>Climb speed: </b>
            {verticalRate ? Math.round(verticalRate * 60) : "0"} meters/min
          </li>
          <li>
            <b>{onGround ? "On ground" : "In air"}</b>
          </li>
        </ul>
      </Popup>
    </Marker>
  );
};

export default PlaneMarker;
