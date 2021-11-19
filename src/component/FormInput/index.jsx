import React, { useState, useEffect } from "react";
import { Table, Select, Row, Col, Divider, Image } from "antd";
import { Map, TileLayer, Marker, Polyline } from "react-leaflet";
import moment from "moment";
import {
  getAllProvinces,
  getUserInProvince,
  getRouteByUser,
  getRouteInfo,
  getMainSign,
  getImageDisplay,
} from "../../apis/api";
import "../../App.css";
import style from "./index.module.css";
const { Option } = Select;
const response = [
  [
      21.03035,
      105.7817782
  ],
  [
      21.03035,
      105.7817782
  ],
  [
      21.0303861,
      105.7817956
  ],
  [
      21.0303687,
      105.7817803
  ],
  [
      21.0303687,
      105.7817803
  ],
  [
      21.0303687,
      105.7817803
  ],
  [
      21.0303661,
      105.7817421
  ],
  [
      21.0303661,
      105.7817421
  ],
  [
      21.0303278,
      105.7817638
  ],
  [
      21.0303161,
      105.7817572
  ],
  [
      21.0303161,
      105.7817572
  ],
  [
      21.0303161,
      105.7817572
  ],
  [
      21.0302922,
      105.7817436
  ],
  [
      21.0303196,
      105.7817976
  ],
  [
      21.0303196,
      105.7817976
  ],
  [
      21.0303196,
      105.7817976
  ],
  [
      21.0305158,
      105.7818162
  ],
  [
      21.0305158,
      105.7818162
  ],
  [
      21.0305158,
      105.7818162
  ],
  [
      21.0303654,
      105.7817745
  ],
  [
      21.0303299,
      105.7817571
  ],
  [
      21.0303299,
      105.7817571
  ],
  [
      21.0302944,
      105.781749
  ]
]
export default function FormInput() {
  const [allProvinces, setAllProvinces] = useState();
  const [provinceSelected, setProvinceSelected] = useState();
  const [user, setUser] = useState();
  const [userSelected, setUserSelected] = useState();
  const [allSign, setAllSign] = useState();
  const [routeSelected, setRouteSelected] = useState();
  const [allRoute, setAllRoute] = useState();
  const [image, setImage] = useState();
  const [latLngArr, setLatLngArr] = useState();

  const columns = [
    {
      title: "Latitude",
      key: "lat",
      dataIndex: "lat",
    },
    {
      title: "Longitude",
      key: "lng",
      dataIndex: "lng",
    },
    {
      title: "Acc",
      key: "acc",
      dataIndex: "acc",
    },
    {
      title: "Azimuth",
      key: "azimuth",
      dataIndex: "azimuth",
    },
    {
      title: "Collect Time",
      key: "collectTime",
      render: (record) => {
        return moment(record.collectTime).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: "Sign name",
      key: "signName",
      dataIndex: "signName",
    },
    {
      title: "Speed",
      key: "speed",
      dataIndex: "speed",
    },
    {
      title: "Lanes",
      key: "lanes",
      dataIndex: "lanes",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Image",
      key: "image",
      fixed: "right",
      width: 100,
      render: (record) => {
        return (
          <>
            {record.imageByte && (
              <Image
                style={{ width: "120px" }}
                src={`data:image/jpeg;base64,${record.imageByte}`}
                preview={{
                  src: `data:image/jpeg;base64,${record.imageByte}`,
                }}
              />
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getListProvinces();
  }, []);

  useEffect(() => {
    getListUser();
  }, [provinceSelected]);

  useEffect(() => {
    getAllRouteByUser();
  }, [userSelected]);

  useEffect(() => {
    getInfoOfRoute();
    getSignInRoute();
  }, [routeSelected]);

  const getListProvinces = () => {
    getAllProvinces()
      .then((res) => {
        if (res && res.status === 200) {
          setAllProvinces(res.data);
        }
      })
      .catch(() => console.log("error", "Error"));
  };

  const getListUser = () => {
    let param = {
      province: provinceSelected,
    };
    getUserInProvince(param)
      .then((res) => {
        if (res && res.status === 200) {
          setUser(res.data);
        }
      })
      .catch(() => console.log("error", "Error"));
  };

  const getAllRouteByUser = () => {
    let param = {
      username: userSelected,
    };
    getRouteByUser(param)
      .then((res) => {
        if (res && res.status === 200) {
          setAllRoute(res.data);
        }
      })
      .catch(() => console.log("error", "Error"));
  };

  const getInfoOfRoute = () => {
    let param = {
      routeId: routeSelected,
    };
    getRouteInfo(param)
      .then((res) => {
        if (res && res.status === 200) {
          let data = res.data.sort((a, b) => (a.time > b.time) ? 1 : -1);
          console.log(data);
          let listPoint = data.map((item) => {
            return [item.lat, item.lng];
          });
          console.log("list point", listPoint);
          setLatLngArr(listPoint);
        }
      })
      .catch(() => console.log("error", "Error"));
  };

  const getSignInRoute = () => {
    let param = {
      routeId: routeSelected,
    };
    getMainSign(param)
      .then((res) => {
        if (res && res.status === 200) {
          setAllSign(res.data);
        }
      })
      .catch(() => console.log("error", "Error"));
  };

  const displayImage = (imageId) => {
    let param = {
      imageId: "a89d639a-586f-46d0-b975-69673d1168a6",
    };
    console.log("param", param);
    getImageDisplay(param)
      .then((res) => {
        if (res && res.status === 200) {
          setImage(res.data);
        }
      })
      .catch(() => console.log("error", "Error"));
  };

  const handleClickToDisplayImage = (imageId) => {
    displayImage();
  };

  const handleChangeProvince = (val) => {
    setProvinceSelected(val);
  };

  const handleSelectUser = (val) => {
    setUserSelected(val);
  };

  const handleSelectRoute = (val) => {
    setRouteSelected(val);
  };

  console.log("image", image);

  return (
    <div className="App container" style={{ marginTop: "20px" }}>
      <Row>
        <Col xs={{ span: 15 }} md={{ span: 15 }} style={{ width: "100%" }}>
          <Row>
            <Col
              className="gutter-row"
              xs={{ span: 5 }}
              md={{ span: 5 }}
              offset={1}
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Chọn thành phố"
                onChange={handleChangeProvince}
              >
                {allProvinces &&
                  allProvinces.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
              </Select>
            </Col>
            <Col
              xs={{ span: 5 }}
              md={{ span: 5 }}
              offset={1}
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Chọn người dùng"
                onChange={handleSelectUser}
              >
                {user &&
                  user.map((item) => (
                    <Option key={item.username} value={item.username}>
                      {item.username}
                    </Option>
                  ))}
              </Select>
            </Col>
            <Col
              xs={{ span: 5 }}
              md={{ span: 5 }}
              offset={1}
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Chọn tuyen duong"
                onChange={handleSelectRoute}
              >
                {allRoute &&
                  allRoute.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>
          <Divider />

          {allSign && (
            <Table
              style={{ width: "100%", overflowX: "scroll" }}
              className={style.tableCss}
              bordered={true}
              columns={columns}
              dataSource={allSign}
            />
          )}
        </Col>

        <Col xs={{ span: 9 }} md={{ span: 9 }} style={{ width: "100%" }}>
          <Map
            center={[21.025432, 105.7928293]}
            zoom={13}
            scrollWheelZoom={true}
            minZoom={5}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[9.779349, 105.6189045]}>
            </Marker> */}
            {latLngArr && latLngArr.length > 0 && (
              <Polyline
                positions={latLngArr}
                weight={5}
                color="red"
                opacity={1}
                fillColor="red"
              ></Polyline>
            )}
          </Map>
        </Col>
      </Row>
      {/* <Row>
        <Col
          className="gutter-row"
          xs={{ span: 5 }}
          md={{ span: 5 }}
          offset={1}
          style={{ width: "100%" }}
        >
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder="Chọn thành phố"
            onChange={handleChangeProvince}
          >
            {allProvinces &&
              allProvinces.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
          </Select>
        </Col>
        <Col
          xs={{ span: 5 }}
          md={{ span: 5 }}
          offset={1}
          style={{ width: "100%" }}
        >
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder="Chọn người dùng"
            onChange={handleSelectUser}
          >
            {user &&
              user.map((item) => (
                <Option key={item.username} value={item.username}>
                  {item.username}
                </Option>
              ))}
          </Select>
        </Col>
        <Col
          xs={{ span: 5 }}
          md={{ span: 5 }}
          offset={1}
          style={{ width: "100%" }}
        >
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder="Chọn tuyen duong"
            onChange={handleSelectRoute}
          >
            {allRoute &&
              allRoute.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
          </Select>
        </Col>
      </Row>
      <br />
      <Divider />
      <Row style={{ width: "100%" }}>
        <Col xs={{ span: 18 }} md={{ span: 18 }} style={{ width: "100%" }}>
          {allSign && (
            <Table
              style={{ width: "98%", height: "100%" }}
              className="tableCustomCss"
              bordered={true}
              columns={columns}
              dataSource={allSign}
            />
          )}
        </Col>
        <Col xs={{ span: 6 }} md={{ span: 6 }} style={{ width: "100%" }}>
          {image && (
            <Image
              src={`data:image/jpeg;base64,${image}`}
              preview={{
                src: `data:image/jpeg;base64,${image}`,
              }}
            />
          )}
        </Col>
      </Row> */}
    </div>
  );
}
