import {
  Col,
  Row,
  Progress,
  Input,
  Form,
  List,
  Avatar,
  Button,
  Skeleton,
} from "antd";

export function ListUser(props) {
  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit">edit</a>,
        <a key="list-loadmore-more">more</a>,
      ]}
    >
      <Skeleton avatar title={false} active>
        <List.Item.Meta
          avatar={<Avatar src={item.picture.large} />}
          title={props.user}
        />
        <div>content</div>
      </Skeleton>
    </List.Item>
  );
}
