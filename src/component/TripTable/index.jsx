import { Col, Row, Card, Table } from "antd";
import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import moment from 'moment';
import { getAllUserAndRouteByAdmin } from "../../apis/api";

export function TripTable(props) {
  const [allUseRoute, setAllUserRoute] = useState();

  const column = [
    {
      title: "Tài khoản",
      key: "username",
      dataIndex: "username"
    },
    {
      title: "Tên đường",
      key: "roadName",
      dataIndex: "roadName",
    },
    {
      title: "Thời gian bắt đầu",
      key: "startTime",
      render: (record) => {
        return moment(record.startTime).format('DD/MM/YYYY HH:mm:ss')
      },
      sorter: (a, b) => a.startTime - b.startTime
    },
    {
      title: "Thời gian kêts thúc",
      key: "endTime",
      render: (record) => {
        return moment(record.endTime).format('DD/MM/YYYY HH:mm:ss')
      },
      sorter: (a, b) => a.endTime - b.endTime
    },
    {
      title: "Khoảng cách thu thập",
      key: "distance",
      dataIndex: "distance",
      sorter: (a, b) => a.distance - b.distance
    },
    {
      title: "Số biển thu thập",
      key: "totalSign",
      dataIndex: "totalSign",
      sorter: (a, b) => a.totalSign - b.totalSign
    },
  ];

//   useEffect(() => {
//     getListUserAndRoute();
//   }, []);

//   const getListUserAndRoute = () => {
//     let param = {
//       adminId: "2c1eeeb4-3c86-4e45-a438-ec4278df099c",
//     };
//     getAllUserAndRouteByAdmin(param)
//       .then((resp) => {
//         if (resp && resp.status === 200) {
//           let res = [];
//           for (let i = 0; i < resp.data.length; i++) {
//             let item = resp.data[i];

//             for (let i = 0; i < item.routes.length; i++) {
//               let r = {
//                 username: item.username,
//                 routeId: item.routes[i].routeId,
//                 distance: item.routes[i].distance,
//                 startTime: item.routes[i].startTime,
//                 endTime: item.routes[i].endTime,
//                 totalSign: item.routes[i].totalSign,
//                 geoPoints: item.routes[i].geoPoints,
//               };
//               res.push(r);
//             }
//           }
//           setAllUserRoute(res);
//         }
//       })
//       .catch(() => console.log("error", "Error"));
//   };

  return (
    <div style={{height: '300px'}}>
      {/* <p style={{ fontWeight: "600" }}>Danh sách hành trình</p> */}
      {props.data && (
        <Table
          style={{ width: "100%", overflowX: "scroll", overflowY: "scroll", height: "80%" }}
          className={style.tableCss}
          bordered={true}
          columns={column}
          dataSource={props.data}
        />
      )}
    </div>
  );
}
