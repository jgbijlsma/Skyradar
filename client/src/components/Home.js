import React, { useState, useEffect, useRef, useCallback } from "react";
import { Map, TileLayer } from "react-leaflet";
import axios from "axios";
import PlaneMarker from "./PlaneMarker";

const Home = () => {
  const position = [51.505, -0.09];
  const mapRef = useRef(null);
  const [planes, setPlanes] = useState([]);
  let viewChangeCancel = useRef(null);

  const onViewChange = useCallback(async () => {
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
    onViewChange();
  }, [onViewChange]);

  const renderPlanes = () => {
    return planes.map((plane, i) => {
      return plane[5] && plane[6] ? (
        <PlaneMarker key={i} plane={plane}></PlaneMarker>
      ) : null;
    });
  };

  return (
    <>
      <Map
        center={position}
        zoom={7}
        style={{ height: 500 }}
        // onzoomend={onViewChange}
        onmoveend={onViewChange}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderPlanes()}
      </Map>
    </>
  );
};

export default Home;
