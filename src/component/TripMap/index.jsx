import React, { useEffect, useState } from "react";
import { Map, TileLayer, Popup, Polyline } from "react-leaflet";
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import moment from "moment";
import "./index.css";

export function TripMap(props) {
  var routeSelected = props.routeSelected;
  const [centerMap, setCenterMap] = useState([21.025432, 105.7928293]);

  const [tripSelected, setTripSelected] = useState();
  const [trip, setTrip] = useState([]);
  const [idMap, setIdMap] = useState();

  useEffect(() => {
    routeSelected = undefined;
    setTrip(props.data);
  }, [props.data, props.userSelected]);

  useEffect(() => {
    let id = (!props.activeKey.includes('1')) ? 'mapContentFull' : 'mapContent';
    setIdMap(id)
  }, [props.activeKey])

  useEffect(() => {
    if (routeSelected) {
      let tr = [];
      tr.push(routeSelected);
      setTrip(tr);
      let p = Math.floor(props.routeSelected.geoPoints.length/2);
      const point = props.routeSelected.geoPoints[p];
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

  const handlerChangeColorOfTrip = (e, item) => {
    setTripSelected(item.routeId);
    e.target.openPopup();
    // return (<PopupInfoTrip item={item} />)
  };

  return (
    <div id={idMap}>
      {/* {trip &&  */}
      <Map
        fullscreenControl={true}
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
              color={tripSelected === item.routeId ? "red" : "blue"}
              opacity={1}
              fillColor={item.color}
              onclick={(e) => handlerChangeColorOfTrip(e, item)}
              // onClick={e => e.target.openPopup()}
            >
              <PopupInfoTrip item={item} />
            </Polyline>
          ))}
      </Map>
{/* } */}
    </div>
  );
}
