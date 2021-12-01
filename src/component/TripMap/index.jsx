import React, { useEffect, useState, useRef } from "react";
import { Map, TileLayer, Popup, Polyline } from "react-leaflet";
import moment from "moment";
import { map } from "leaflet";

export function TripMap(props) {
  // const trip = props.data;
  var routeSelected = props.routeSelected;
  const [centerMap, setCenterMap] = useState([21.025432, 105.7928293]);

  const [tripSelected, setTripSelected] = useState();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    routeSelected = undefined;
    setTrip(props.data);
  }, [props.data, props.userSelected]);

  useEffect(() => {
    if (routeSelected) {
      let tr = [];
      tr.push(routeSelected);
      setTrip(tr);

      const point = props.routeSelected.geoPoints[0];
      const center = [point.lat, point.lng];
      setCenterMap(center);
    } else {
      setTrip(props.data);
    }
  }, [props.routeSelected]);

  const PopupInfoTrip = (props) => {
    const item = props.item;
    return (
      <Popup>
        <p>
          Tài khoản: <b>{`${item.username}`}</b>
        </p>
        <p>Tên đường: {`${item.roadName}`}</p>
        <p>Khoảng cách thu thập: {item.distance} km</p>
        <p>Số biển thu thập: {item.totalSign} </p>
        <p>
          Thời gian bắt đầu:{" "}
          {moment(item.startTime).format("DD/MM/YYYY HH:mm:ss")}
        </p>
        <p>
          Thời gian kết thúc:{" "}
          {moment(item.endTime).format("DD/MM/YYYY HH:mm:ss")}
        </p>
      </Popup>
    );
  };

  const handlerChangeColorOfTrip = (routeId) => {
    setTripSelected(routeId);
  };

  return (
    <div>
      <Map
        // ref={mapView}
        style={{ width: "100%" }}
        center={centerMap}
        zoom={13}
        scrollWheelZoom={true}
        minZoom={5}
        whenReady={(map) =>
          props.routeSelected &&
          map.setMapView(props.routeSelected.geoPoints, 15)
        }
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trip &&
          trip.length > 0 &&
          trip.map((item) => (
            <Polyline
              positions={item.geoPoints}
              weight={5}
              color={tripSelected === item.routeId ? "red" : item.color}
              opacity={1}
              fillColor={item.color}
              onclick={() => handlerChangeColorOfTrip(item.routeId)}
            >
              <PopupInfoTrip item={item} />
            </Polyline>
          ))}
      </Map>
    </div>
  );
}
