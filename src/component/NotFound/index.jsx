import React from 'react'
import { Result, Button } from 'antd';

export function NotFound() {
  const status = '404';

  return (
    <Result
      status={status}
      title={status}
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={<Button type='primary'>Về trang chủ</Button>}
    />
  );
}
