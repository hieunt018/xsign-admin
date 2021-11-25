import { Layout, Row, Col, Image } from "antd";
import React from "react";
// import { AccountDropdown } from './AccountDropdown';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Logo from "../../images/logo-xsign.png";
import styles from "./index.module.css";

const { Header } = Layout;

export function MainHeader(props) {
  return (
    <Header
      className={`${styles.siteLayoutBackground} ${styles.header}`}
      style={{ padding: 0 }}
    >
      <Row>
        <Col md={4}>
          <Image style={{ width: "45%", margin: '0 auto' }} src={Logo} preview={false}></Image>
        </Col>
        <Col md={16}>
          <p className={`${styles.headerDescription}`}>
            Quản lý hành trình thu thập biển báo - Tài khoản: QL-KV1
          </p>
        </Col>
        <Col md={4}></Col>
      </Row>
      <div className={styles.right}>
        {/* <NotificationDropdown /> */}
        {/* <TranslationDropDown /> */}
        {/* <AccountDropdown /> */}
      </div>
    </Header>
  );
}
