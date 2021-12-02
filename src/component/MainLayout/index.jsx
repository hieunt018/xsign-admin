import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getAllUserByAdmin } from "../../apis/api";
import { getAccountInfoFromToken } from "../../utils/token";
import { MainHeader } from "../Header";
import { MainContent } from "../MainContent";
import { SideBar } from "../SideBar";

const colors = [
  "purple",
  "green",
  "yellow",
  "lime",
  "maroon",
  "navy",
  "olive",
  "orange",
  "blue",
  "silver",
  "teal",
  "white",
  "black",
  "fuchsia",
  "gray",
];

export function MainLayout() {
  const [allUser, setAllUser] = useState();
  const [accountAdmin, setAccountAdmin] = useState();
  const [userSelected, setUserSelected] = useState();

  useEffect(() => {
    document.title = "X-Sign management";
    getAllUser();
    setAccountAdmin(getAccountInfoFromToken().username);
  }, []);

  const getAllUser = () => {
    getAllUserByAdmin().then((res) => {
      let data = res.data;
      let users = [];
      for (let i = 0; i < data.length; i++) {
        let u = {
          userId: data[i].userId,
          name: data[i].username,
          color: colors[i],
        };
        users.push(u);
      }
      setAllUser(users);
    });
  };

  return (
    <div>
      <MainHeader accountAdmin={accountAdmin} />
      <div>
        <Row>
          <Col xs={24} md={4}>
            <SideBar
              style={{ marginLeft: "1%" }}
              data={allUser}
              setUserSelected={setUserSelected}
            />
          </Col>
          <Col xs={24} md={20}>
            <MainContent allUser={allUser} userSelected={userSelected} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
