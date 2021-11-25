import { Col, Row, Card, Image } from 'antd';
import { useEffect, useState } from "react";
import { getAllUserByAdmin } from "../../apis/api";
import { MainHeader } from "../Header";
import { MainContent } from '../MainContent';
import { SideBar } from "../SideBar";

const colors= ['red', 'green', 'yellow', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 
'silver', 'teal', 'white', 'yellow', 'black', 'blue', 'fuchsia', 'gray'];

export function MainLayout() {

    const [allUser, setAllUser] = useState();

    useEffect(() => {
      getAllUser();
    }, []);
  
    const getAllUser = () => {
      getAllUserByAdmin().then((res) => {
          let data = res.data;
          let users = [];
          for (let i = 0; i < data.length; i++) {
              let u = {
                  name: data[i],
                  color: colors[i]
              }
              users.push(u)
          }
        setAllUser(users);
      });
    };

    return (
        <div>
            <MainHeader/>

            <div>
                <Row>
                    <Col md={4}>
                        <SideBar style={{marginLeft: '1%'}} data={allUser}/>
                    </Col>
                    <Col md={20}>
                        <MainContent data={allUser}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}