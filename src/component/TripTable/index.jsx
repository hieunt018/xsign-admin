import { Table } from "antd";
import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import "./index.css";
import moment from "moment";

export function TripTable(props) {
  const [rowSelected, setRowSelected] = useState();
  const column = [
    {
      title: "Tài khoản",
      key: "username",
      dataIndex: "username",
      width: '15%'
    },
    {
      title: "Tên đường",
      key: "roadName",
      dataIndex: "roadName",
      width: '30%'
    },
    {
      title: "Thời gian bắt đầu",
      key: "startTime",
      width: '15%',
      render: (record) => {
        return moment(record.startTime).format("DD/MM/YYYY HH:mm:ss");
      },
      sorter: (a, b) => a.startTime - b.startTime,
    },
    {
      title: "Thời gian kết thúc",
      key: "endTime",
      width: '15%',
      render: (record) => {
        return moment(record.endTime).format("DD/MM/YYYY HH:mm:ss");
      },
      sorter: (a, b) => a.endTime - b.endTime,
    },
    {
      title: "Khoảng cách thu thập (Km)",
      key: "distance",
      width: '15%',
      dataIndex: "distance",
      sorter: (a, b) => a.distance - b.distance,
    },
    {
      title: "Số biển thu thập",
      key: "totalSign",
      width: '10%',
      dataIndex: "totalSign",
      sorter: (a, b) => a.totalSign - b.totalSign,
    },
  ];

  useEffect(() => {
    props.setRouteSelected(rowSelected);
  }, [rowSelected]);

  return (
    <div style={{ height: '200px' }}>
      {/* {props.data && ( */}
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setRowSelected(record);
              },
            };
          }}
          style={{
            width: "100%"
          }}
          className={style.tableCss}
          bordered={true}
          columns={column}
          dataSource={props.data}
          scroll={{ y: 100 }}
          loading={props.loading}
        />
      {/* )} */}
    </div>
  );
}
