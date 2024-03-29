import { Collapse } from "antd";
import React, { useState, useEffect } from "react";
import { TripTable } from "../TripTable";
import { TripMap } from "../TripMap";
import { getAllUserAndRouteByAdmin } from "../../apis/api";
import './index.css';

const { Panel } = Collapse;

export function MainContent(props) {
  const [allUseRoute, setAllUserRoute] = useState();
  const [routeSelected, setRouteSelected] = useState();
  const [activeKey, setActiveKey] = useState(['1', '2']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.allUser) {
      getListUserAndRoute();
    }
  }, [props.allUser, props.userSelected]);

  const getListUserAndRoute = () => {
    setLoading(true)
    let params = !props.userSelected ? '' : {
      listUserId: (props.userSelected.includes('all')) ? '' : props.userSelected.toString()
    }
    getAllUserAndRouteByAdmin(params)
      .then((resp) => {
        if (resp && resp.status === 200) {
          let res = [];
          for (let i = 0; i < resp.data.length; i++) {
            let item = resp.data[i];

            for (let i = 0; i < item.routes.length; i++) {
              if (item.routes[i].geoPoints) {
                let r = {
                  userId: item.userId,
                  username: item.username,
                  routeId: item.routes[i].routeId,
                  roadName: item.routes[i].roadName,
                  distance: item.routes[i].distance,
                  startTime: item.routes[i].startTime,
                  endTime: item.routes[i].endTime,
                  totalSign: item.routes[i].totalSign,
                  geoPoints: item.routes[i].geoPoints,
                  color: props.allUser.filter((x) => x.name === item.username)[0]
                    .color,
                };
                res.push(r);
              }
            }
          }
          setAllUserRoute(res);
          setLoading(false)
        }
      })
      .catch(() => { 
        console.log("error", "Error")
        setLoading(false)
      });
  };

  const handleChangeTab = (key) => {
    setActiveKey(key)
  }

  return (
    <>
      <Collapse defaultActiveKey={["1", "2"]} onChange={handleChangeTab}>
        <Panel header={<b>Danh sách hành trình</b>} key="1" >
          <TripTable loading={loading} data={allUseRoute} setRouteSelected={setRouteSelected} userSelected={props.userSelected} activeKey={activeKey} />
        </Panel>
      </Collapse>
      <Collapse collapsible="disabled" defaultActiveKey={['1']}>
        <Panel id='tabMapTrip' header={<b>Hành trình trên bản đồ</b>} key="1">
          <TripMap data={allUseRoute} routeSelected={routeSelected} userSelected={props.userSelected} activeKey={activeKey} />
        </Panel>
      </Collapse>
    </>
  );
}
