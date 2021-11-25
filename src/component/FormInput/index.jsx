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
  getAllUserAndRouteByAdmin
} from "../../apis/api";
import "../../App.css";
import style from "./index.module.css";
const { Option } = Select;

export default function FormInput() {
  const [allUseRoute, setAllUserRoute] = useState();
  const [allProvinces, setAllProvinces] = useState();
  const [provinceSelected, setProvinceSelected] = useState();
  const [user, setUser] = useState();
  const [userSelected, setUserSelected] = useState();
  const [allSign, setAllSign] = useState();
  const [routeSelected, setRouteSelected] = useState();
  const [allRoute, setAllRoute] = useState();
  const [image, setImage] = useState();
  const [latLngArr, setLatLngArr] = useState();
  const [allLatLngArr, setAllLatLngArr] = useState();

  const column = [
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = row.rowSpan;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: "Route Id",
      key: "routeId",
      dataIndex: "routeId",
    },
    {
      title: "Distance",
      key: "distance",
      dataIndex: "distance",
    },
    {
      title: "Total sign",
      key: "totalSign",
      dataIndex: "totalSign",
    }
  ]

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
                // preview={{
                //   src: `data:image/jpeg;base64,${record.imageByte}`,
                // }}
              />
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    // getListProvinces();
    getListUserAndRoute();
  }, []);

  // useEffect(() => {
  //   getListUser();
  // }, [provinceSelected]);

  // useEffect(() => {
  //   getAllRouteByUser();
  // }, [userSelected]);

  // useEffect(() => {
  //   getInfoOfRoute();
  //   getSignInRoute();
  // }, [routeSelected]);

  const getListUserAndRoute = () => {
    let param = {
      adminId: '2c1eeeb4-3c86-4e45-a438-ec4278df099c',
    };
    getAllUserAndRouteByAdmin(param)
      .then((resp) => {
        if (resp && resp.status === 200) {
          let res = [];
          for (let i = 0; i < resp.data.length; i++) {
            let item = resp.data[i];
            
            for (let i = 0; i < item.routes.length; i++) {
              let r = {
                username: item.username,
                rowSpan: item.routes.length,
                routeId: item.routes[i].routeId,
                distance: item.routes[i].distance,
                totalSign: item.routes[i].totalSign,
                geoPoints: item.routes[i].geoPoints,
              }
              res.push(r)
            }
          }
          let listCoordinate = [];
          let listRoute = res.map(route => {
            console.log(route)
            if (route.geoPoints) {
              let latLngs = route.geoPoints.sort((a, b) => (a.time > b.time) ? 1 : -1);
            console.log(latLngs)
          let latLngArr = latLngs.map((item) => {
              return [item.lat, item.lng];
          });
          listCoordinate.push(latLngArr)
            }
          })
          // let latLngs = listRoute.sort((a, b) => (a.time > b.time) ? 1 : -1);
          // let listPoint = latLngs.map((item) => {
          //   return [item.lat, item.lng];
          // });

          console.log('listCoordinate', listCoordinate)
          setAllLatLngArr(listCoordinate)
          setAllUserRoute(res)
        }
      })
      .catch(() => console.log("error", "Error"));
  };

  console.log(allUseRoute)
  console.log(allLatLngArr)
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
          // setAllRoute(res.data);
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

          {allUseRoute && (
            <Table
              style={{ width: "100%", overflowX: "scroll" }}
              className={style.tableCss}
              bordered={true}
              columns={column}
              dataSource={allUseRoute}
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
            {allLatLngArr && allLatLngArr.length > 0 && allLatLngArr.map(item =>
            (
              <Polyline
                positions={item}
                weight={5}
                color="red"
                opacity={1}
                fillColor="red"
              ></Polyline>
            ))}
          </Map>
        </Col>
      </Row>
    </div>
  );
}
