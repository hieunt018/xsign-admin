import { Col, Row, Card, Image } from 'antd';
import React from 'react';
import LoginForm from './LoginForm';
import Logo from '../../images/logo-xsign.png';
import ItemSign from '../../images/item-sign.png';
import styles from './index.module.css';

export function Login() {
  return (
    <div>
      <Row>
        <Col xs={16} sm={16} md={16}>
          <Card style={{width: '40%', margin: '15% auto'}}
            headStyle={{
              textAlign: 'center'
            }}
            title={<Image src={Logo} className={styles.img} />}
            className={styles.cardBorder}
          >
            <Row gutter={[8, 16]}>
              <Col xs={24} sm={24} md={24}>
                <LoginForm></LoginForm>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={8} style={{background: '#949E9E', width: '100%', height: '100%'}}>
          <div>
            <p className={styles.nameApp}>X-Sign Management</p>
            <p className={styles.description}>Website hỗ trợ quản lý thông tin các tuyến đường đã lấy biển</p>
          </div>
          <div style={{marginTop: '37%', marginLeft: '20%'}}>
            <Image src={ItemSign}></Image>
          </div>
        </Col>
      </Row>
      {/* <div className={styles.footer}>
        © 2020 Viettel Networks. All rights reserved.
      </div> */}
    </div>
  );
}

export default Login;
