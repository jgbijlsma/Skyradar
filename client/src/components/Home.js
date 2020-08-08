import React, { useState, useEffect, useRef, useCallback } from "react";
import { Map, TileLayer } from "react-leaflet";
import axios from "axios";
import PlaneMarker from "./PlaneMarker";
import PlaneInfoPanel from "./PlaneInfoPanel";

const Home = () => {
  const position = [51.505, -0.09];
  const mapRef = useRef(null);
  let viewChangeCancel = useRef(null);

  const [planes, setPlanes] = useState([]);
  const [updateInterval, setUpdateInterval] = useState();
  const [selectedPlane, setSelectedPlane] = useState(null);

  const updatePlanes = useCallback(async () => {
    try {
      if (viewChangeCancel.current) {
        viewChangeCancel.current();
        viewChangeCancel.current = null;
      }

      const bounds = mapRef.current.leafletElement.getBounds();

      const res = await axios.get(
        `https://Devistry:devistryopensky@opensky-network.org/api/states/all?lamin=${bounds._southWest.lat}&lomin=${bounds._southWest.lng}&lamax=${bounds._northEast.lat}&lomax=${bounds._northEast.lng}`,
        {
          cancelToken: new axios.CancelToken((c) => {
            viewChangeCancel.current = c;
          }),
        }
      );
      setPlanes(res.data.states);
    } catch (err) {}
  }, []);

  useEffect(() => {
    updatePlanes();

    const i = setInterval(updatePlanes, 10000);
    setUpdateInterval(i);
  }, [updatePlanes]);

  useEffect(() => {
    return () => clearInterval(updateInterval);
  }, [updateInterval]);

  const renderPlanes = () => {
    let num = 0;
    return planes.map((plane, i) => {
      num++;
      if (num > 500) return null;
      return plane[5] && plane[6] ? (
        <PlaneMarker
          key={i}
          plane={plane}
          setSelectedPlane={setSelectedPlane}
        ></PlaneMarker>
      ) : null;
    });
  };

  return (
    <>
      <Map
        center={position}
        zoom={7}
        style={{ height: "100%" }}
        // onzoomend={onViewChange}
        onmoveend={updatePlanes}
        minZoom={3}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {planes && renderPlanes()}
      </Map>
      {selectedPlane && (
        <PlaneInfoPanel
          plane={selectedPlane}
          setSelectedPlane={setSelectedPlane}
        />
      )}
    </>
  );
};

export default Home;
