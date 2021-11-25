import { Col, Row, Progress, Input, Form, Tag } from "antd";
import { MainHeader } from "../Header";
import { AudioOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllUserByAdmin } from "../../apis/api";
import Checkbox from "antd/lib/checkbox/Checkbox";
import styles from "./index.module.css";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
export function SideBar(props) {
  const [form] = Form.useForm();

  const onSearch = () => {};

  return (
    <div className={`${styles.sideBar}`}>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: "90%", marginTop: "5%", marginLeft: "2%" }}
      />
      {/* <div>
          <div>
            <Progress percent={100} size="small" />
          </div>
      </div> */}
      {/* <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Form.Item label={"Tất cả"} name="all" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        {props.data &&
          props.data.length > 0 &&
          props.data.map((user) => (
            <Form.Item
              label={
                <>
                  <Tag color={user.color}></Tag>
                  <p style={{ margin: "0" }}>{user.name}</p>
                </>
              }
              name={user}
              valuePropName="checked"
            >
              <Checkbox style={{ marginRight: "5px" }} />
            </Form.Item>
          ))}
      </Form> */}
      <div style={{marginLeft: '8%', marginTop: '5%'}}>
        <div>
          <Checkbox>Tất cả</Checkbox>
        </div>
        {props.data &&
          props.data.length > 0 &&
          props.data.map((user) => (
            <div>
              <Checkbox>
                <>
                  <Tag style={{width: '40px'}} color={user.color}></Tag>
                  <p style={{ margin: "0", float: 'right' }}>{user.name}</p>
                </>
              </Checkbox>
            </div>
          ))}
      </div>
    </div>
  );
}
