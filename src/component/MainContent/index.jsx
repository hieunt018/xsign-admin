import { Col, Row, Card, Image, Collapse } from "antd";
import React, { useState, useEffect } from "react";
import { TripTable } from "../TripTable";
import { TripMap } from "../TripMap";
import { getAllUserAndRouteByAdmin } from "../../apis/api";

const { Panel } = Collapse;

export function MainContent(props) {
  const [allUseRoute, setAllUserRoute] = useState();

  useEffect(() => {
    if (props.data) {
      getListUserAndRoute();
    }
  }, [props.data]);

  const getListUserAndRoute = () => {
    let param = {
      adminId: "2c1eeeb4-3c86-4e45-a438-ec4278df099c",
    };
    getAllUserAndRouteByAdmin(param)
      .then((resp) => {
        if (resp && resp.status === 200) {
          let res = [];
          for (let i = 0; i < resp.data.length; i++) {
            let item = resp.data[i];

            for (let i = 0; i < item.routes.length; i++) {
              console.log(item.routes[i].geoPoints);
              if (item.routes[i].geoPoints) {
                let r = {
                  username: item.username,
                  routeId: item.routes[i].routeId,
                  roadName: item.routes[i].roadName,
                  distance: item.routes[i].distance,
                  startTime: item.routes[i].startTime,
                  endTime: item.routes[i].endTime,
                  totalSign: item.routes[i].totalSign,
                  geoPoints: item.routes[i].geoPoints,
                  color: props.data.filter((x) => x.name === item.username)[0]
                    .color,
                };
                res.push(r);
              }
            }
          }
          setAllUserRoute(res);
        }
      })
      .catch(() => console.log("error", "Error"));
  };
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header={<b>Danh sách hành trình</b>} key="1">
        <TripTable data={allUseRoute} />
      </Panel>
      <Panel header={<b>Hành trình trên bản đồ</b>} key="2">
        <TripMap data={allUseRoute} />
      </Panel>
    </Collapse>
  );
}
