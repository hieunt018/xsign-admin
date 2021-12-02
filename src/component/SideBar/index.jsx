import { Tag, Checkbox } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export function SideBar(props) {
  const [userIds, setUserIds] = useState();
  const [checkAll, setCheckAll] = useState(true);
  const [indeterminate, setIndeterminate] = useState();

  function handleSelectUser(checkedValues) {
    setUserIds(checkedValues);
    setIndeterminate(
      !!checkedValues.length && checkedValues.length < setAllCheckedBox().length
    );
    setCheckAll(checkedValues.length === setAllCheckedBox().length);
    props.setUserSelected(checkedValues.length === 0 ? "none" : checkedValues);
  }

  const setAllCheckedBox = () => {
    let res = [];
    props?.data?.map((item) => {
      res.push(item.userId);
    });
    return res;
  };

  useEffect(() => {
    setUserIds(setAllCheckedBox());
  }, [props.data]);

  const handleClickAll = (e) => {
    setUserIds(e.target.checked ? setAllCheckedBox() : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      props.setUserSelected("all");
    } else {
      props.setUserSelected("none");
    }
  };

  return (
    <div className={`${styles.sideBar}`}>
      <div style={{ margin: "2% 10% 2% 10%" }}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={handleClickAll}
          checked={checkAll}
        >
          Tất cả
        </Checkbox>
        <br />
        <Checkbox.Group onChange={handleSelectUser} value={userIds}>
          {props.data &&
            props.data.length > 0 &&
            props.data.map((user) => (
              <div>
                <Checkbox value={user.userId}>
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