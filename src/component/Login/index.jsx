import { Col, Row, Card, Image } from "antd";
import React from "react";
import LoginForm from "./LoginForm";
import Logo from "../../images/logo-xsign.png";
import ItemSign from "../../images/item-sign.png";
import styles from "./index.module.css";

export function Login() {
  return (
    <div>
      <Row>
        <Col xs={24} sm={16} md={16}>
          <Card
            style={{ width: "60vh", margin: "15% auto" }}
            headStyle={{
              textAlign: "center",
            }}
            title={
              <Image
                src={Logo}
                preview={false}
                className={styles.img}
                style={{ margin: "0 auto" }}
              />
            }
            className={styles.cardBorder}
          >
            <Row>
              <Col xs={24} sm={24} md={24}>
                <LoginForm></LoginForm>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col
          xs={0}
          sm={8}
          md={8}
          style={{
            background: "#949E9E",
            width: "100%",
            height: "100vh",
            position: "relative",
          }}
        >
          <div>
            <p className={styles.nameApp}>X-Sign Management</p>
            <p className={styles.description}>
              Website hỗ trợ quản lý thông tin các tuyến đường đã lấy biển
            </p>
          </div>
          <div style={{ position: "absolute", bottom: "0", marginLeft: "15%" }}>
            <Image src={ItemSign} preview={false}></Image>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
