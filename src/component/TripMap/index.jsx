import React from "react";
import { Map, TileLayer, Popup, Polyline } from "react-leaflet";
import moment from "moment";

export function TripMap(props) {
  const trip = props.data;

  const PopupInfoTrip = (props) => {
    const item = props.item;
    return (
      <Popup>
        <p>Tài khoản: {`${item.username}`}</p>
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

  return (
    <div>
      <Map
        style={{ width: "100%" }}
        center={[21.025432, 105.7928293]}
        zoom={13}
        scrollWheelZoom={true}
        minZoom={5}
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
              color={item.color}
              opacity={1}
              fillColor={item.color}
            >
              <PopupInfoTrip item={item} />
            </Polyline>
          ))}
      </Map>
    </div>
  );
}
