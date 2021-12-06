import { useHistory } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { revokeToken } from "../../../utils/token";

export function AccountDropdown() {
  const history = useHistory();

  const _logout = () => {
    history.push('/x-sign-admin/login');
    document.title = "Login - XSign Management";
    revokeToken();
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={_logout} key="2">
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["hover"]} >
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: "#eb3434"}}
            size="small"
            className={styles.avatar}
            alt="avatar"
          ></Avatar>
          <CaretDownOutlined style={{marginTop: '10px'}} />
        </span>
      </Dropdown>
    </>
  );
}
