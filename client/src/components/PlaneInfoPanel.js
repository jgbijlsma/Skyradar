import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Separator from "./util/Separator";

const PlaneInfoPanel = ({ plane, setSelectedPlane }) => {
  const callsign = plane[1];
  const planeOrigin = plane[2];
  const lastUpdate = new Date(plane[4] * 1000);
  const lon = plane[5];
  const lat = plane[6];
  const altitude = plane[7];
  const onGround = plane[8];
  const velocity = plane[9];
  const track = plane[10];
  const verticalRate = plane[11];
  const squawk = plane[14];

  return (
    <div className="info-panel">
      <button className="close-btn" onClick={() => setSelectedPlane(null)}>
        <CloseIcon fontSize="large" />
      </button>

      {callsign && (
        <>
          <h2 className="callsign">{callsign}</h2>
          <Separator />
        </>
      )}

      <table>
        <tbody>
          {altitude && (
            <tr>
              <th>Altitude:</th>
              <td>
                <p>{Math.round(altitude)} m </p>
                <p> {Math.round(altitude * 3.281)} ft </p>
                <p>Flight Level {Math.round((altitude * 3.281) / 100)}</p>
                {onGround ? <p>On ground</p> : <p>In air</p>}
              </td>
            </tr>
          )}
          {velocity && (
            <tr>
              <th>Speed:</th>
              <td>
                <p>{Math.round(velocity * 3.6)} k/h</p>
                <p>{Math.round(velocity * 1.944)} knots</p>
              </td>
            </tr>
          )}
          {track && (
            <tr>
              <th>Heading:</th>
              <td>{Math.round(track)}°</td>
            </tr>
          )}
          <tr>
            <th>Climb speed:</th>
            <td>{verticalRate ? Math.round(verticalRate * 60) : "0"} m/min</td>
          </tr>
          {lon && (
            <tr>
              <th>Longitude:</th>
              <td>{lon}</td>
            </tr>
          )}
          {lat && (
            <tr>
              <th>Latitude:</th>
              <td>{lat}</td>
            </tr>
          )}
          {squawk && (
            <tr>
              <th>Squawk code:</th>
              <td>{squawk}</td>
            </tr>
          )}
          {planeOrigin && (
            <tr>
              <th>Registered in:</th>
              <td>{planeOrigin}</td>
            </tr>
          )}
        </tbody>
      </table>

      {lastUpdate && (
        <p className="last-update">
          Last update: {lastUpdate.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default PlaneInfoPanel;
