import { Table } from "antd";
import React from "react";
import style from "./index.module.css";
import './index.css'
import moment from 'moment';

export function TripTable(props) {

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
      title: "Thời gian kết thúc",
      key: "endTime",
      render: (record) => {
        return moment(record.endTime).format('DD/MM/YYYY HH:mm:ss')
      },
      sorter: (a, b) => a.endTime - b.endTime
    },
    {
      title: "Khoảng cách thu thập (Km)",
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

  return (
    <div style={{height: '200px'}}>
      {props.data && (
        <Table
          style={{ width: "100%", overflowX: "scroll", overflowY: "scroll", height: "95%" }}
          className={style.tableCss}
          bordered={true}
          columns={column}
          dataSource={props.data}
        //   scroll={{ y: 100}}
        />
      )}
    </div>
  );
}
