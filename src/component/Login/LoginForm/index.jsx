import { Form, Row, Col, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { login } from '../../../apis/auth';
import { useState, useEffect } from 'react';
import { setToken, getToken } from '../../../utils/token';
import { Navigate } from 'react-router-dom';
import styles from './index.module.css';
import './index.css';

const layout = {
  wrapperCol: { span: 24 }
};

export default function LoginForm() {
  // eslint-disable-next-line

  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState()

  const _handleFormSubmit = (values) => {
    setLoading(true);
    setError(false);

    login({
        username: values.username,
        password: values.password
      })
      .then(response => {
        let token= response.data.token;
        console.log(token)
        setToken(token);
        setLoading(false);
        setLogin(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    setLogin(getToken() !== null)
  }, [])

  const loadingIndicator = <LoadingOutlined spin />;

  return (
    <>
      {isLogin ? (
        <Navigate push to={page ? page : '/'} />
      ) : (
        <Form
          {...layout}
          name='basic'
          onFinish={_handleFormSubmit}
          initialValues={{ remember: true }}
        >
          <Row>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                colon={false}
                name='username'
                rules={[
                  { required: true, message: "Nhập thông tin username." }
                ]}
              >
                <Input
                  placeholder="Tài khoản"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item
                colon={false}
                name='password'
                rules={[
                  { required: true, message: "Nhập thông tin mật khẩu." }
                ]}
              >
                <Input.Password
                  placeholder="Mật khẩu"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item colon={false} style={{ textAlign: 'center' }}>
                <Button
                  className={styles.btnLogin}
                  style={{ width: '100%', color: '#013BA6' }}
                  disabled={isLoading}
                  type='primary'
                  htmlType='submit'
                >
                  {!isLoading ? "Đăng nhập" : loadingIndicator}
                </Button>
              </Form.Item>
              {isError && (
                <Form.Item colon={false} className={styles.error}>
                  <Alert message="Vui lòng lại kiểm tra thông tin đăng nhập." type='error' showIcon />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}
