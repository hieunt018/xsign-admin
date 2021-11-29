import { Layout, Row, Col, Image } from "antd";
import React from "react";
import { AccountDropdown } from "./AccountDropdown";
import Logo from "../../images/logo-xsign.png";
import styles from "./index.module.css";
import "./index.css";

const { Header } = Layout;

export function MainHeader(props) {
  return (
    <Header
      className={`${styles.siteLayoutBackground} ${styles.header}`}
      style={{ padding: 0 }}
    >
      <Row>
        <Col xs={4} md={4}>
          <Image
          id='imageHeader'
            style={{ height: "100%", margin: "0 auto" }}
            src={Logo}
            preview={false}
          ></Image>
        </Col>
        <Col xs={18} md={18}>
          <p className={`${styles.headerDescription}`}>
            Quản lý hành trình thu thập biển báo - Tài khoản: {props.accountAdmin}
          </p>
        </Col>
        <Col xs={2} md={2}>
          <AccountDropdown className={styles.right} />
        </Col>
      </Row>
      <div >
        {/* <NotificationDropdown /> */}
        {/* <TranslationDropDown /> */}
      </div>
    </Header>
  );
}
