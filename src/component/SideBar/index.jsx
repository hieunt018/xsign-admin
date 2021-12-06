import { Tag, Checkbox, Search, Select, Pagination } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const { Option } = Select;

export function SideBar(props) {
  const [userIds, setUserIds] = useState();
  const [checkAll, setCheckAll] = useState(true);
  const [indeterminate, setIndeterminate] = useState();
  const [totalUser, setTotalUser] = useState();
  const [listUser, setListUser] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

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
    setTotalUser(props.data?.length)
    setUserIds(setAllCheckedBox());
    setListUser(props.data?.slice((currentPage - 1) * pageSize, pageSize * currentPage))
  }, [props.data, currentPage, pageSize]);

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

  const onShowSizeChange = (currentPage, pageSize) => {
    setCurrentPage(1);
    setPageSize(pageSize);
  }

  const onChangePage = (pageSize) => {
    setCurrentPage(pageSize);
  }

  return (
    <div className={`${styles.sideBar}`}>
      {/* <Search
        placeholder="input search text"
        style={{ width: "90%", marginTop: "5%", marginLeft: "2%" }}
      /> */}
      <Select
        className={`${styles.selectionSidebar}`}
        showSearch
        placeholder="Chọn người dùng"
        onChange={handleSelectUser}
        filterOption={(input, option) =>
          option?.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {props.data &&
          props.data.map((item) => (
            <Option key={item.name} value={item.userId}>
              {item.name}
            </Option>
          ))}
      </Select>

      <div style={{ margin: "0 10% 2% 10%" }}>
        {listUser &&
          <Checkbox
            indeterminate={indeterminate}
            onChange={handleClickAll}
            checked={checkAll}
          >
            Tất cả ({totalUser})
          </Checkbox>
        }
        <br />
        <Checkbox.Group onChange={handleSelectUser} value={userIds}>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user) => (
              <div>
                <Checkbox value={user.userId}>
                  <>
                    {/* <Tag style={{ width: "40px" }} color={user.color}></Tag> */}
                    <p style={{ margin: "0", float: "right" }}>{user.name}</p>
                  </>
                </Checkbox>
              </div>
            ))}
        </Checkbox.Group>
      </div>
      {listUser &&
        <div style={{ marginLeft: '10px' }}>
          <Pagination
            style={{ float: 'right' }}
            pageSize={pageSize}
            total={totalUser}
            current={currentPage}
            onShowSizeChange={onShowSizeChange}
            showSizeChanger
            onChange={onChangePage} />
        </div>
      }
    </div>
  );
}