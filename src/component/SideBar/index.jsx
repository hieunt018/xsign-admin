import { Input, Tag, Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const { Option } = Select;

export function SideBar(props) {
  const [userIds, setUserIds] = useState("all");
  const [checkedStt, setCheckedStt] = useState(false);

  function handleSelectUser(checkedValues) {
    if (checkedValues === "all") {
      setCheckedStt(true);
    }
    setUserIds(checkedValues);
    console.log("checkedValues", checkedValues);
    props.setUserSelected(checkedValues);
  }

  // useEffect(() => {
  //   handleSelectUser();
  // }, [])

  // const handleSelectUser = () => {

  // }

  return (
    <div className={`${styles.sideBar}`}>
      {/* <Search
        placeholder="input search text"
        style={{ width: "90%", marginTop: "5%", marginLeft: "2%" }}
      /> */}
      {/* <Select
        className={`${styles.selectionSidebar}`}
        showSearch
        placeholder="Chọn người dùng"
        onChange={handleSelectUser}
      >
        {props.data &&
          props.data.map((item) => (
            <Option key={item.name} value={item.name}>
              {item.name}
            </Option>
          ))}
      </Select> */}
      <div style={{ margin: '2% 10% 2% 10%' }}>
        <Checkbox.Group onChange={handleSelectUser} value={userIds}>
          <Checkbox value={"all"}>Tất cả</Checkbox>
          {props.data &&
            props.data.length > 0 &&
            props.data.map((user) => (
              <div>
                <Checkbox value={user.userId} disabled={checkedStt}>
                  <>
                    <Tag style={{ width: "40px" }} color={user.color}></Tag>
                    <p style={{ margin: "0", float: "right" }}>{user.name}</p>
                  </>
                </Checkbox>
              </div>
            ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}
